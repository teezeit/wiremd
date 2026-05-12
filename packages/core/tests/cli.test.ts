/**
 * Tests for CLI functionality
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync, rmSync } from 'fs';
import { execSync, spawn, type ChildProcess } from 'child_process';
import { get } from 'http';
import { createServer } from 'net';
import { tmpdir } from 'os';
import { resolve } from 'path';

const waitFor = async (predicate: () => boolean | Promise<boolean>, timeoutMs = 5000) => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (await predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  throw new Error(`Timed out after ${timeoutMs}ms`);
};

const stopProcess = async (child: ChildProcess) => {
  if (child.exitCode !== null || child.killed) return;

  child.kill('SIGTERM');

  await new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      if (child.exitCode === null && !child.killed) {
        child.kill('SIGKILL');
      }
      resolve();
    }, 1000);

    child.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
};

const getFreePort = async () => new Promise<number>((resolve, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, () => {
    const address = server.address();
    if (!address || typeof address === 'string') {
      server.close();
      reject(new Error('Could not allocate a port'));
      return;
    }
    const port = address.port;
    server.close(() => resolve(port));
  });
});

const listenOnPort = async (port: number) => {
  const server = createServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, () => resolve());
  });
  return server;
};

const request = async (port: number, path: string) => new Promise<{ status: number; headers: any; body: string }>((resolve, reject) => {
  get({ hostname: '127.0.0.1', port, path }, (res) => {
    let body = '';
    res.setEncoding('utf-8');
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      resolve({ status: res.statusCode ?? 0, headers: res.headers, body });
    });
  }).on('error', reject);
});

describe('CLI', () => {
  // Use os.tmpdir() so concurrent turbo tasks (e.g. wiremd-landing's vite copy
  // through apps/docs/node_modules/wiremd) don't race on these files.
  const TEST_INPUT = resolve(tmpdir(), 'wiremd-cli-test-input.md');
  const TEST_OUTPUT = resolve(tmpdir(), 'wiremd-cli-test-output.html');
  const TEST_DIR = resolve(tmpdir(), 'wiremd-cli-test-directory');

  const createDirectoryFixture = () => {
    rmSync(TEST_DIR, { recursive: true, force: true });
    mkdirSync(resolve(TEST_DIR, 'nested'), { recursive: true });
    mkdirSync(resolve(TEST_DIR, 'node_modules'), { recursive: true });
    writeFileSync(resolve(TEST_DIR, '_nav.md'), '[[ [Home](./index.md) | [About](./about.md) ]]', 'utf-8');
    writeFileSync(resolve(TEST_DIR, 'index.md'), '![[_nav.md]]\n\n# Home\n\n[Start]', 'utf-8');
    writeFileSync(resolve(TEST_DIR, 'about.md'), '![[_nav.md]]\n\n# About\n\nDetails', 'utf-8');
    writeFileSync(resolve(TEST_DIR, 'nested', 'detail.md'), '# Detail', 'utf-8');
    writeFileSync(resolve(TEST_DIR, 'node_modules', 'ignored.md'), '# Ignored', 'utf-8');
  };

  beforeEach(() => {
    // Create test input file
    writeFileSync(
      TEST_INPUT,
      '# Test Wireframe\n\n## Button\n[Click Me]\n',
      'utf-8'
    );
  });

  afterEach(() => {
    // Clean up test files
    try {
      if (existsSync(TEST_INPUT)) {
        unlinkSync(TEST_INPUT);
      }
      if (existsSync(TEST_OUTPUT)) {
        unlinkSync(TEST_OUTPUT);
      }
      if (existsSync(TEST_DIR)) {
        rmSync(TEST_DIR, { recursive: true, force: true });
      }
    } catch (e) {
      // Ignore if files don't exist
    }
  });

  describe('Help command', () => {
    it('should display help message', () => {
      const result = execSync('node dist/cli/index.js --help', {
        encoding: 'utf-8',
      });

      expect(result).toContain('wiremd');
      expect(result).toContain('USAGE:');
      expect(result).toContain('OPTIONS:');
      expect(result).toContain('EXAMPLES:');
    });

    it('should show all available options', () => {
      const result = execSync('node dist/cli/index.js --help', {
        encoding: 'utf-8',
      });

      expect(result).toContain('--output');
      expect(result).toContain('--format');
      expect(result).toContain('--style');
      expect(result).toContain('--watch');
      expect(result).toContain('--serve');
    });

    it('should list all available styles', () => {
      const result = execSync('node dist/cli/index.js --help', {
        encoding: 'utf-8',
      });

      expect(result).toContain('sketch');
      expect(result).toContain('clean');
      expect(result).toContain('wireframe');
      expect(result).toContain('none');
      expect(result).toContain('tailwind');
      expect(result).toContain('material');
      expect(result).toContain('brutal');
    });
  });

  describe('Version command', () => {
    it('should display version', () => {
      const result = execSync('node dist/cli/index.js --version', {
        encoding: 'utf-8',
      });

      expect(result).toMatch(/wiremd v\d+\.\d+\.\d+/);
    });
  });

  describe('Basic file generation', () => {
    it('should generate HTML from markdown', () => {
      let stdout = '';
      let stderr = '';
      try {
        const result = execSync(`node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT}`, {
          encoding: 'utf-8',
          stdio: 'pipe',
        });
        stdout = result;
      } catch (error: any) {
        stdout = error.stdout || '';
        stderr = error.stderr || '';
        throw new Error(
          `CLI command failed: ${error.message}\nStdout: ${stdout}\nStderr: ${stderr}`
        );
      }

      if (!existsSync(TEST_OUTPUT)) {
        throw new Error(
          `Output file not created.\nStdout: ${stdout}\nStderr: ${stderr}\nInput exists: ${existsSync(TEST_INPUT)}`
        );
      }

      expect(existsSync(TEST_OUTPUT)).toBe(true);
      const html = readFileSync(TEST_OUTPUT, 'utf-8');
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
    });

    it('should include parsed content in output', () => {
      try {
        execSync(`node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT}`, {
          encoding: 'utf-8',
          stdio: 'pipe',
        });
      } catch (error: any) {
        throw new Error(
          `CLI command failed: ${error.message}\nStdout: ${error.stdout}\nStderr: ${error.stderr}`
        );
      }

      expect(existsSync(TEST_OUTPUT)).toBe(true);
      const html = readFileSync(TEST_OUTPUT, 'utf-8');
      expect(html).toContain('Test Wireframe');
      expect(html).toContain('button');
    });

    it('should apply default sketch style', () => {
      try {
        execSync(`node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT}`, {
          stdio: 'pipe'
        });
      } catch (error: any) {
        // If execSync throws, log the error for debugging
        console.error('CLI command failed:', error.message);
        if (error.stderr) {
          console.error('stderr:', error.stderr.toString());
        }
        throw error;
      }

      expect(existsSync(TEST_OUTPUT)).toBe(true);
      const html = readFileSync(TEST_OUTPUT, 'utf-8');
      // Sketch style should include hand-drawn characteristics
      expect(html).toContain('style');
    });
  });

  describe('Basic directory generation', () => {
    beforeEach(() => {
      createDirectoryFixture();
    });

    it('should render a directory without requiring serve or watch', () => {
      const result = execSync(`node dist/cli/index.js "${TEST_DIR}" --style clean`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      expect(existsSync(resolve(TEST_DIR, 'index.html'))).toBe(true);
      expect(existsSync(resolve(TEST_DIR, 'about.html'))).toBe(true);
      expect(existsSync(resolve(TEST_DIR, 'nested', 'detail.html'))).toBe(true);
      expect(existsSync(resolve(TEST_DIR, '_nav.html'))).toBe(false);
      expect(existsSync(resolve(TEST_DIR, 'node_modules', 'ignored.html'))).toBe(false);
      expect(readFileSync(resolve(TEST_DIR, 'index.html'), 'utf-8')).toContain('Home');
      expect(result).toContain('Open:');
      expect(result).toContain('index.html');
      expect(result).toContain('file://');
    });

    it('should generate JSON files for a directory', () => {
      execSync(`node dist/cli/index.js "${TEST_DIR}" --format json`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      expect(existsSync(resolve(TEST_DIR, 'index.json'))).toBe(true);
      expect(existsSync(resolve(TEST_DIR, 'about.json'))).toBe(true);
      expect(existsSync(resolve(TEST_DIR, 'nested', 'detail.json'))).toBe(true);
      expect(existsSync(resolve(TEST_DIR, '_nav.json'))).toBe(false);
      expect(() => JSON.parse(readFileSync(resolve(TEST_DIR, 'index.json'), 'utf-8'))).not.toThrow();
    });

    it('should ignore custom output paths for directory inputs', () => {
      const ignoredOutput = resolve(tmpdir(), 'wiremd-cli-directory-ignored-output.html');

      try {
        execSync(`node dist/cli/index.js "${TEST_DIR}" -o "${ignoredOutput}" --style clean`, {
          encoding: 'utf-8',
          stdio: 'pipe',
        });

        expect(existsSync(resolve(TEST_DIR, 'index.html'))).toBe(true);
        expect(existsSync(resolve(TEST_DIR, 'about.html'))).toBe(true);
        expect(existsSync(ignoredOutput)).toBe(false);
      } finally {
        rmSync(ignoredOutput, { force: true });
      }
    });

    it('should include partials in rendered pages without emitting partial output files', () => {
      execSync(`node dist/cli/index.js "${TEST_DIR}" --style clean`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      const html = readFileSync(resolve(TEST_DIR, 'index.html'), 'utf-8');
      expect(html).toContain('About');
      expect(html).toContain('./about.md');
      expect(existsSync(resolve(TEST_DIR, '_nav.html'))).toBe(false);
    });

    it('should perform the initial render in directory watch mode', async () => {
      let output = '';
      const child = spawn('node', ['dist/cli/index.js', TEST_DIR, '--watch', '--style', 'clean'], {
        stdio: 'pipe',
      });
      child.stdout?.on('data', (chunk) => {
        output += chunk.toString();
      });
      child.stderr?.on('data', (chunk) => {
        output += chunk.toString();
      });

      try {
        await waitFor(() => existsSync(resolve(TEST_DIR, 'index.html')));
        await waitFor(() => output.includes('Open:'));

        expect(existsSync(resolve(TEST_DIR, 'about.html'))).toBe(true);
        expect(readFileSync(resolve(TEST_DIR, 'index.html'), 'utf-8')).toContain('Home');
        expect(output).toContain('Open:');
        expect(output).toContain('index.html');
        expect(output).toContain('file://');
      } finally {
        await stopProcess(child);
      }
    }, 10000);

    it('should regenerate directory output in watch mode when markdown changes', async () => {
      let output = '';
      const child = spawn('node', ['dist/cli/index.js', TEST_DIR, '--watch', '--style', 'clean'], {
        stdio: 'pipe',
      });
      child.stdout?.on('data', (chunk) => {
        output += chunk.toString();
      });
      child.stderr?.on('data', (chunk) => {
        output += chunk.toString();
      });

      try {
        await waitFor(() => existsSync(resolve(TEST_DIR, 'about.html')));
        await waitFor(() => output.includes('Watcher ready'));

        writeFileSync(resolve(TEST_DIR, 'about.md'), '![[_nav.md]]\n\n# Updated About\n\nChanged', 'utf-8');

        await waitFor(() => {
          const htmlPath = resolve(TEST_DIR, 'about.html');
          return existsSync(htmlPath) && readFileSync(htmlPath, 'utf-8').includes('Updated About');
        });
      } finally {
        await stopProcess(child);
      }
    }, 10000);

    it('should regenerate directory output when a glob watch pattern matches', async () => {
      let output = '';
      const pattern = resolve(TEST_DIR, '**/*.md');
      const child = spawn('node', ['dist/cli/index.js', TEST_DIR, '--watch', '--watch-pattern', pattern, '--style', 'clean'], {
        stdio: 'pipe',
      });
      child.stdout?.on('data', (chunk) => {
        output += chunk.toString();
      });
      child.stderr?.on('data', (chunk) => {
        output += chunk.toString();
      });

      try {
        await waitFor(() => existsSync(resolve(TEST_DIR, 'about.html')));
        await waitFor(() => output.includes('Watcher ready'));

        writeFileSync(resolve(TEST_DIR, 'about.md'), '![[_nav.md]]\n\n# Pattern Updated\n\nChanged', 'utf-8');

        await waitFor(() => {
          const htmlPath = resolve(TEST_DIR, 'about.html');
          return existsSync(htmlPath) && readFileSync(htmlPath, 'utf-8').includes('Pattern Updated');
        });
      } finally {
        await stopProcess(child);
      }
    }, 10000);

    it('should render an empty directory as zero outputs', () => {
      rmSync(TEST_DIR, { recursive: true, force: true });
      mkdirSync(TEST_DIR, { recursive: true });

      const result = execSync(`node dist/cli/index.js "${TEST_DIR}"`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      expect(result).toContain('0 files');
    });

    it('should not emit outputs for a directory containing only partials', () => {
      rmSync(TEST_DIR, { recursive: true, force: true });
      mkdirSync(TEST_DIR, { recursive: true });
      writeFileSync(resolve(TEST_DIR, '_nav.md'), '# Navigation', 'utf-8');

      execSync(`node dist/cli/index.js "${TEST_DIR}"`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      expect(existsSync(resolve(TEST_DIR, '_nav.html'))).toBe(false);
    });
  });

  describe('Style options', () => {
    it('should accept clean style', () => {
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --style clean`
      );

      expect(existsSync(TEST_OUTPUT)).toBe(true);
    });

    it('should accept wireframe style', () => {
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --style wireframe`
      );

      expect(existsSync(TEST_OUTPUT)).toBe(true);
    });

    it('should accept material style', () => {
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --style material`
      );

      expect(existsSync(TEST_OUTPUT)).toBe(true);
    });

    it('should accept tailwind style', () => {
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --style tailwind`
      );

      expect(existsSync(TEST_OUTPUT)).toBe(true);
    });

    it('should accept brutal style', () => {
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --style brutal`
      );

      expect(existsSync(TEST_OUTPUT)).toBe(true);
    });

    it('should accept none style', () => {
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --style none`
      );

      expect(existsSync(TEST_OUTPUT)).toBe(true);
    });

    it('should reject invalid style', () => {
      expect(() => {
        execSync(
          `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --style invalid`,
          { encoding: 'utf-8' }
        );
      }).toThrow();
    });
  });

  describe('Format options', () => {
    it('should generate HTML format', () => {
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --format html`
      );

      const content = readFileSync(TEST_OUTPUT, 'utf-8');
      expect(content).toContain('<html');
    });

    it('should generate JSON format', () => {
      const jsonOutput = resolve(tmpdir(), 'wiremd-cli-test-output.json');
      execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${jsonOutput} --format json`
      );

      const content = readFileSync(jsonOutput, 'utf-8');
      expect(() => JSON.parse(content)).not.toThrow();

      // Clean up
      unlinkSync(jsonOutput);
    });

    it('should reject invalid format', () => {
      expect(() => {
        execSync(
          `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT} --format xml`,
          { encoding: 'utf-8' }
        );
      }).toThrow();
    });
  });

  describe('Error handling', () => {
    it('should error on missing input file', () => {
      expect(() => {
        execSync('node dist/cli/index.js nonexistent.md', {
          encoding: 'utf-8',
        });
      }).toThrow();
    });

    it('should error with exit code 1 when no input specified', () => {
      // CLI should exit with error when no input is provided
      let exitCode = 0;
      try {
        execSync('node dist/cli/index.js', { encoding: 'utf-8', stdio: 'pipe' });
      } catch (error: any) {
        exitCode = error.status;
      }
      expect(exitCode).toBe(1);
    });

    it('should reject unsupported input extensions without overwriting the source', () => {
      const textInput = resolve(tmpdir(), 'wiremd-cli-test-input.txt');
      writeFileSync(textInput, '# Not Markdown Extension', 'utf-8');

      try {
        expect(() => {
          execSync(`node dist/cli/index.js "${textInput}"`, {
            encoding: 'utf-8',
            stdio: 'pipe',
          });
        }).toThrow();
        expect(readFileSync(textInput, 'utf-8')).toBe('# Not Markdown Extension');
      } finally {
        rmSync(textInput, { force: true });
      }
    });

    it('should render a warning for missing includes instead of failing generation', () => {
      writeFileSync(TEST_INPUT, '# Include Test\n\n![[missing.md]]', 'utf-8');

      execSync(`node dist/cli/index.js "${TEST_INPUT}" -o "${TEST_OUTPUT}"`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });

      expect(readFileSync(TEST_OUTPUT, 'utf-8')).toContain('Could not include: missing.md');
    });
  });

  describe('Output path handling', () => {
    it('should auto-generate output path from input', () => {
      execSync(`node dist/cli/index.js ${TEST_INPUT}`);

      const autoOutput = TEST_INPUT.replace('.md', '.html');
      expect(existsSync(autoOutput)).toBe(true);

      // Clean up
      unlinkSync(autoOutput);
    });

    it('should respect custom output path', () => {
      const customOutput = resolve(tmpdir(), 'wiremd-cli-test-custom-output.html');
      execSync(`node dist/cli/index.js ${TEST_INPUT} -o ${customOutput}`);

      expect(existsSync(customOutput)).toBe(true);

      // Clean up
      unlinkSync(customOutput);
    });
  });

  describe('Server integration', () => {
    it('should accept serve port option', () => {
      // We can't actually test the server starting in unit tests
      // but we can verify the option is accepted
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('--serve');
      expect(cliSource).toContain('parseInt');
    });

    it('should validate port number', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('isNaN');
      expect(cliSource).toContain('port');
    });
  });

  describe('Watch mode integration', () => {
    it('should accept watch option', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('--watch');
      expect(cliSource).toContain('chokidar');
    });

    it('should use debouncing for file changes', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('awaitWriteFinish');
      expect(cliSource).toContain('stabilityThreshold');
      expect(cliSource).toContain('isProcessing');
    });

    it('should regenerate on file changes', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('regenerate');
      expect(cliSource).toContain('generateOutput');
      expect(cliSource).toContain('writeFileSync');
    });

    it('should regenerate single-file output when the input changes', async () => {
      let output = '';
      const child = spawn('node', ['dist/cli/index.js', TEST_INPUT, '-o', TEST_OUTPUT, '--watch', '--style', 'clean'], {
        stdio: 'pipe',
      });
      child.stdout?.on('data', (chunk) => {
        output += chunk.toString();
      });
      child.stderr?.on('data', (chunk) => {
        output += chunk.toString();
      });

      try {
        await waitFor(() => existsSync(TEST_OUTPUT));
        await waitFor(() => output.includes('Watcher ready'));

        writeFileSync(TEST_INPUT, '# Changed Single File\n\n[Save]', 'utf-8');

        await waitFor(() => readFileSync(TEST_OUTPUT, 'utf-8').includes('Changed Single File'));
      } finally {
        await stopProcess(child);
      }
    }, 10000);

    it('should regenerate single-file output when a glob watch pattern matches', async () => {
      let output = '';
      rmSync(TEST_DIR, { recursive: true, force: true });
      mkdirSync(TEST_DIR, { recursive: true });
      const watchInput = resolve(TEST_DIR, 'watch-input.md');
      const watchOutput = resolve(TEST_DIR, 'watch-output.html');
      const pattern = resolve(TEST_DIR, '*.md');
      writeFileSync(watchInput, '# Pattern Watch Start\n\n[Save]', 'utf-8');

      const child = spawn('node', ['dist/cli/index.js', watchInput, '-o', watchOutput, '--watch', '--watch-pattern', pattern, '--style', 'clean'], {
        stdio: 'pipe',
      });
      child.stdout?.on('data', (chunk) => {
        output += chunk.toString();
      });
      child.stderr?.on('data', (chunk) => {
        output += chunk.toString();
      });

      try {
        await waitFor(() => existsSync(watchOutput));
        await waitFor(() => output.includes('Watcher ready'));

        writeFileSync(watchInput, '# Pattern Changed Single File\n\n[Save]', 'utf-8');

        await waitFor(() => readFileSync(watchOutput, 'utf-8').includes('Pattern Changed Single File'));
      } finally {
        await stopProcess(child);
      }
    }, 10000);
  });

  describe('Serve mode integration', () => {
    beforeEach(() => {
      createDirectoryFixture();
    });

    it('should serve a single generated file', async () => {
      const port = await getFreePort();
      const child = spawn('node', ['dist/cli/index.js', TEST_INPUT, '-o', TEST_OUTPUT, '--serve', String(port), '--style', 'clean'], {
        stdio: 'pipe',
      });

      try {
        await waitFor(async () => {
          try {
            const response = await request(port, '/wiremd-cli-test-input.md');
            return response.status === 200 && response.body.includes('Test Wireframe');
          } catch {
            return false;
          }
        });

        const root = await request(port, '/');
        const page = await request(port, '/wiremd-cli-test-input.md');
        expect(root.status).toBe(302);
        expect(root.headers.location).toBe('/wiremd-cli-test-input.md');
        expect(page.status).toBe(200);
        expect(page.body).toContain('Test Wireframe');
        expect(page.body).toContain('wiremd-toolbar');
      } finally {
        await stopProcess(child);
      }
    }, 10000);

    it('should auto-increment from the default port when --serve has no explicit port', async () => {
      const blocker = await listenOnPort(3000);
      let output = '';
      const child = spawn('node', ['dist/cli/index.js', TEST_INPUT, '-o', TEST_OUTPUT, '--serve', '--style', 'clean'], {
        stdio: 'pipe',
      });
      child.stdout?.on('data', (chunk) => {
        output += chunk.toString();
      });
      child.stderr?.on('data', (chunk) => {
        output += chunk.toString();
      });

      try {
        await waitFor(async () => {
          try {
            const response = await request(3001, '/wiremd-cli-test-input.md');
            return response.status === 200 && response.body.includes('Test Wireframe');
          } catch {
            return false;
          }
        });

        expect(output).toContain('Port 3000 is already in use, trying 3001');
        expect(output).toContain('http://localhost:3001');
      } finally {
        await stopProcess(child);
        await new Promise<void>((resolve) => blocker.close(() => resolve()));
      }
    }, 10000);

    it('should report port conflicts without an unhandled Node stack trace', async () => {
      const blocker = createServer();
      const port = await new Promise<number>((resolve, reject) => {
        blocker.once('error', reject);
        blocker.listen(0, () => {
          const address = blocker.address();
          if (!address || typeof address === 'string') {
            reject(new Error('Could not allocate a port'));
            return;
          }
          resolve(address.port);
        });
      });

      try {
        let output = '';
        try {
          execSync(`node dist/cli/index.js "${TEST_INPUT}" --serve ${port}`, {
            encoding: 'utf-8',
            stdio: 'pipe',
          });
        } catch (error: any) {
          output = `${error.stdout ?? ''}${error.stderr ?? ''}`;
        }

        expect(output).toContain(`Port ${port} is already in use`);
        expect(output).not.toContain('Unhandled');
        expect(output).not.toContain('node:events');
      } finally {
        await new Promise<void>((resolve) => blocker.close(() => resolve()));
      }
    });

    it('should serve a directory index redirect and linked pages', async () => {
      const port = await getFreePort();
      const child = spawn('node', ['dist/cli/index.js', TEST_DIR, '--serve', String(port), '--style', 'clean'], {
        stdio: 'pipe',
      });

      try {
        await waitFor(async () => {
          try {
            const response = await request(port, '/about.html');
            return response.status === 200 && response.body.includes('About');
          } catch {
            return false;
          }
        });

        const root = await request(port, '/');
        const about = await request(port, '/about.html');
        const nested = await request(port, '/nested/detail.html');

        expect(root.status).toBe(302);
        expect(root.headers.location).toBe('/index.md');
        expect(about.status).toBe(200);
        expect(about.body).toContain('About');
        expect(nested.status).toBe(200);
        expect(nested.body).toContain('Detail');
      } finally {
        await stopProcess(child);
      }
    }, 10000);

    it('should serve updated directory content after markdown changes in watch mode', async () => {
      const port = await getFreePort();
      let output = '';
      const child = spawn('node', ['dist/cli/index.js', TEST_DIR, '--serve', String(port), '--watch', '--style', 'clean'], {
        stdio: 'pipe',
      });
      child.stdout?.on('data', (chunk) => {
        output += chunk.toString();
      });
      child.stderr?.on('data', (chunk) => {
        output += chunk.toString();
      });

      try {
        await waitFor(async () => {
          try {
            const response = await request(port, '/about.html');
            return response.status === 200 && response.body.includes('About');
          } catch {
            return false;
          }
        });
        await waitFor(() => output.includes('Watcher ready'));

        writeFileSync(resolve(TEST_DIR, 'about.md'), '![[_nav.md]]\n\n# Served Update\n\nChanged', 'utf-8');

        await waitFor(async () => {
          const response = await request(port, '/about.html');
          return response.status === 200 && response.body.includes('Served Update');
        });
      } finally {
        await stopProcess(child);
      }
    }, 10000);
  });

  describe('Comment rendering option', () => {
    it('should hide comments by default and render them with --show-comments', () => {
      writeFileSync(TEST_INPUT, '<!-- Review this CTA -->\n[Submit]*', 'utf-8');

      execSync(`node dist/cli/index.js "${TEST_INPUT}" -o "${TEST_OUTPUT}" --style clean`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });
      const hiddenHtml = readFileSync(TEST_OUTPUT, 'utf-8');
      expect(hiddenHtml).not.toContain('<aside class="wmd-comments-panel">');
      expect(hiddenHtml).not.toContain('Review this CTA');

      execSync(`node dist/cli/index.js "${TEST_INPUT}" -o "${TEST_OUTPUT}" --style clean --show-comments`, {
        encoding: 'utf-8',
        stdio: 'pipe',
      });
      const html = readFileSync(TEST_OUTPUT, 'utf-8');
      expect(html).toContain('wmd-comments-panel');
      expect(html).toContain('Review this CTA');
    });
  });

  describe('Error notification integration', () => {
    it('should import notifyError function', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('import');
      expect(cliSource).toContain('notifyError');
    });

    it('should call notifyError on generation failure', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('catch');
      expect(cliSource).toContain('notifyError');
      expect(cliSource).toContain('error.message');
    });

    it('should only notify error when serve is active', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('if (options.serve)');
      expect(cliSource).toContain('notifyError');
    });
  });

  describe('Live reload integration', () => {
    it('should import notifyReload function', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('import');
      expect(cliSource).toContain('notifyReload');
    });

    it('should call notifyReload on successful regeneration', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('notifyReload');
    });

    it('should only notify reload when serve is active', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('if (options.serve)');
      expect(cliSource).toContain('notifyReload');
    });
  });

  describe('Signal handling', () => {
    it('should handle SIGINT for graceful shutdown', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('SIGINT');
      expect(cliSource).toContain('process.exit');
    });

    it('should display shutdown message', () => {
      const cliSource = readFileSync('./src/cli/index.ts', 'utf-8');
      expect(cliSource).toContain('Stopping watch mode');
    });
  });

  describe('Console output', () => {
    it('should show parsing message', () => {
      const result = execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT}`,
        { encoding: 'utf-8' }
      );

      expect(result).toContain('Parsing');
    });

    it('should show generation success message', () => {
      const result = execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT}`,
        { encoding: 'utf-8' }
      );

      expect(result).toContain('Generated');
      expect(result).toContain('✓');
    });

    it('should show style being used', () => {
      const result = execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT}`,
        { encoding: 'utf-8' }
      );

      expect(result).toContain('Style');
      expect(result).toContain('sketch');
    });

    it('should show format being used', () => {
      const result = execSync(
        `node dist/cli/index.js ${TEST_INPUT} -o ${TEST_OUTPUT}`,
        { encoding: 'utf-8' }
      );

      expect(result).toContain('Format');
      expect(result).toContain('html');
    });
  });
});
