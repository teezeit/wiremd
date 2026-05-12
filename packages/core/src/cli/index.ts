#!/usr/bin/env node

/**
 * wiremd CLI Tool
 * Generate wireframes from markdown files
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import { readFileSync, writeFileSync, existsSync, statSync, readdirSync, mkdirSync } from 'fs';
import { resolve, dirname, join, basename } from 'path';
import { pathToFileURL } from 'url';
import { parse, resolveIncludes } from '../parser/index.js';
import { renderToHTML, renderToJSON } from '../renderer/index.js';
import { startServer, notifyReload, notifyError } from './server.js';
import chokidar from 'chokidar';
import chalk from 'chalk';

export interface CLIOptions {
  input: string;
  output?: string;
  format?: 'html' | 'json';
  style?: 'sketch' | 'clean' | 'wireframe' | 'none';
  watch?: boolean;
  serve?: number;
  servePortExplicit?: boolean;
  pretty?: boolean;
  watchPattern?: string;
  ignorePattern?: string;
  showComments?: boolean;
}

export function showHelp(): void {
  console.log(`
┌─────────────────────────────────────────────────────────────────┐
│  wiremd - Text-first UI design tool                            │
│  Generate wireframes from Markdown syntax                       │
└─────────────────────────────────────────────────────────────────┘

USAGE:
  wiremd <input.md|dir> [options]

OPTIONS:
  -o, --output <file>        Output file path (default: <input>.html)
  -f, --format <format>      Output format: html, json (default: html)
  -s, --style <style>        Visual style: sketch, clean, wireframe, none, tailwind, material, brutal (default: sketch)
  -w, --watch                Watch for changes and regenerate
  --serve [port]             Start dev server with live-reload (default: 3000)
  --watch-pattern <pattern>  Glob pattern for files to watch (e.g., "**/*.md")
  --ignore <pattern>         Glob pattern for files to ignore (e.g., "**/node_modules/**")
  -p, --pretty               Pretty print output (default: true)
  --show-comments            Show inline comments as sticky-note callouts (default: hidden)
  -h, --help                 Show this help message
  -v, --version              Show version number

EXAMPLES:
  # Generate HTML with default Balsamiq-style
  wiremd wireframe.md

  # Output to specific file
  wiremd wireframe.md -o output.html

  # Use alternative style
  wiremd wireframe.md --style clean

  # Watch mode with live-reload
  wiremd wireframe.md --watch --serve 3000

  # Watch multiple files with pattern
  wiremd wireframe.md --watch --watch-pattern "src/**/*.md"

  # Generate JSON output
  wiremd wireframe.md --format json

  # Generate HTML for every .md file in a directory
  wiremd wireframes/

  # Watch and regenerate a directory
  wiremd wireframes/ --watch

  # Serve a directory
  wiremd wireframes/ --serve 3000

STYLES:
  sketch     - Balsamiq-inspired hand-drawn look (default)
  clean      - Modern minimal design
  wireframe  - Traditional grayscale with hatching
  none       - Unstyled semantic HTML
  tailwind   - Modern utility-first design with purple accents
  material   - Google Material Design with elevation system
  brutal     - Neo-brutalism with bold colors and thick borders

For more information: https://github.com/teezeit/wiremd
`);
}

export function showVersion(): void {
  // Read version from package.json
  try {
    // ESM-compatible way to get directory path
    const currentDir = import.meta.url ? dirname(new URL(import.meta.url).pathname) : __dirname;
    const pkgPath = resolve(currentDir, '../../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    console.log(`wiremd v${pkg.version}`);
  } catch {
    console.log('wiremd v0.1.2');
  }
}

export function parseArgs(args: string[]): CLIOptions | null {
  const options: CLIOptions = {
    input: '',
    format: 'html',
    style: 'sketch',
    pretty: true,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '-h':
      case '--help':
        showHelp();
        return null;

      case '-v':
      case '--version':
        showVersion();
        return null;

      case '-o':
      case '--output':
        options.output = args[++i];
        break;

      case '-f':
      case '--format': {
        const format = args[++i];
        if (format !== 'html' && format !== 'json') {
          console.error(`Error: Invalid format "${format}". Must be html or json.`);
          process.exit(1);
        }
        options.format = format;
        break;
      }

      case '-s':
      case '--style': {
        const style = args[++i];
        if (!['sketch', 'clean', 'wireframe', 'none', 'tailwind', 'material', 'brutal'].includes(style)) {
          console.error(`Error: Invalid style "${style}". Must be sketch, clean, wireframe, none, tailwind, material, or brutal.`);
          process.exit(1);
        }
        options.style = style as any;
        break;
      }

      case '-w':
      case '--watch':
        options.watch = true;
        break;

      case '--serve': {
        const nextArg = args[i + 1];
        options.servePortExplicit = !!nextArg && !nextArg.startsWith('-');
        options.serve = options.servePortExplicit ? parseInt(args[++i], 10) : 3000;
        if (isNaN(options.serve)) {
          console.error('Error: --serve requires a numeric port');
          process.exit(1);
        }
        break;
      }

      case '--watch-pattern':
        options.watchPattern = args[++i];
        break;

      case '--ignore':
        options.ignorePattern = args[++i];
        break;

      case '--show-comments':
        options.showComments = true;
        break;

      case '-p':
      case '--pretty':
        options.pretty = true;
        break;

      default:
        if (arg.startsWith('-')) {
          console.error(`Error: Unknown option "${arg}"`);
          console.error('Run "wiremd --help" for usage information.');
          process.exit(1);
        }
        if (!options.input) {
          options.input = arg;
        }
    }
  }

  if (!options.input) {
    console.error('Error: No input file specified');
    console.error('Run "wiremd --help" for usage information.');
    process.exit(1);
  }

  return options;
}

/**
 * Logger with colored output
 */
const logger = {
  info: (msg: string) => console.log(chalk.blue('ℹ'), msg),
  success: (msg: string) => console.log(chalk.green('✓'), msg),
  warning: (msg: string) => console.log(chalk.yellow('⚠'), msg),
  error: (msg: string) => console.log(chalk.red('✗'), msg),
  watching: (msg: string) => console.log(chalk.cyan('👀'), msg),
  changed: (msg: string) => console.log(chalk.magenta('📝'), msg),
  style: (msg: string) => console.log(chalk.gray('🎨'), msg),
  format: (msg: string) => console.log(chalk.gray('📦'), msg),
};

/**
 * Check if file is too large and might cause performance issues
 */
export function checkFileSize(filePath: string): void {
  try {
    const stats = statSync(filePath);
    const fileSizeMB = stats.size / (1024 * 1024);

    if (fileSizeMB > 10) {
      logger.warning(`Large file detected (${fileSizeMB.toFixed(2)}MB). Processing may take longer.`);
    }
  } catch (error) {
    // Ignore stat errors
  }
}

export function generateOutput(options: CLIOptions): string {
  const { input, format, style, pretty, showComments } = options;

  // Check if input file exists
  if (!existsSync(input)) {
    throw new Error(`File not found: ${input}`);
  }

  // Check file size for performance warning
  checkFileSize(input);

  // Read input file and resolve ![[file.md]] includes
  const raw = readFileSync(input, 'utf-8');
  const markdown = resolveIncludes(raw, resolve(input));

  // Parse to AST
  const ast = parse(markdown);

  // Render to output format
  if (format === 'json') {
    return renderToJSON(ast, { pretty });
  } else {
    return renderToHTML(ast, { style, pretty, inlineStyles: true, showComments: showComments ?? false });
  }
}

const DIRECTORY_IGNORE_NAMES = new Set(['node_modules', '.git', 'dist', 'build']);

function normalizeForGlob(path: string): string {
  return path.replace(/\\/g, '/');
}

function hasGlobPattern(pattern: string): boolean {
  return /[*?[\]{}]/.test(pattern);
}

function globWatchRoot(pattern: string): string {
  if (!hasGlobPattern(pattern)) return pattern;

  const normalized = normalizeForGlob(pattern);
  const segments = normalized.split('/');
  const rootSegments: string[] = [];

  for (const segment of segments) {
    if (hasGlobPattern(segment)) break;
    rootSegments.push(segment);
  }

  const root = rootSegments.join('/') || '.';
  return root === '' ? '/' : root;
}

function globToRegExp(pattern: string): RegExp {
  const normalized = normalizeForGlob(pattern);
  let source = '';

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const next = normalized[i + 1];

    if (char === '*' && next === '*') {
      const afterNext = normalized[i + 2];
      if (afterNext === '/') {
        source += '(?:.*/)?';
        i += 2;
      } else {
        source += '.*';
        i += 1;
      }
    } else if (char === '*') {
      source += '[^/]*';
    } else if (char === '?') {
      source += '[^/]';
    } else {
      source += char.replace(/[.+^${}()|[\]\\]/g, '\\$&');
    }
  }

  return new RegExp(`^${source}$`);
}

export function watchPathsForPattern(pattern: string): string[] {
  return [globWatchRoot(pattern)];
}

export function matchesWatchPattern(filePath: string, pattern?: string): boolean {
  if (!pattern) return true;
  if (!hasGlobPattern(pattern)) return resolve(filePath) === resolve(pattern);
  return globToRegExp(pattern).test(normalizeForGlob(filePath));
}

export function listMarkdownPages(rootDir: string): string[] {
  const files: string[] = [];

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir).sort()) {
      if (entry.startsWith('.') || DIRECTORY_IGNORE_NAMES.has(entry)) continue;
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (entry.endsWith('.md') && !entry.startsWith('_')) {
        files.push(fullPath);
      }
    }
  };

  walk(rootDir);
  return files;
}

export function outputPathForMarkdown(inputFile: string, format: CLIOptions['format'] = 'html'): string {
  const ext = format === 'json' ? '.json' : '.html';
  return inputFile.replace(/\.md$/, ext);
}

export function generateDirectoryOutputs(options: CLIOptions): Array<{ input: string; output: string }> {
  const rootDir = resolve(options.input);
  const pages = listMarkdownPages(rootDir);
  const outputs: Array<{ input: string; output: string }> = [];

  for (const inputFile of pages) {
    const outputFile = outputPathForMarkdown(inputFile, options.format);
    mkdirSync(dirname(outputFile), { recursive: true });
    const output = generateOutput({ ...options, input: inputFile, output: outputFile });
    writeFileSync(outputFile, output, 'utf-8');
    outputs.push({ input: inputFile, output: outputFile });
  }

  return outputs;
}

function preferredDirectoryOutput(outputs: Array<{ input: string; output: string }>): string | undefined {
  return outputs.find(({ output }) => basename(output).startsWith('index.'))?.output ?? outputs[0]?.output;
}

function logDirectoryOpenAddress(outputs: Array<{ input: string; output: string }>, format: CLIOptions['format']): void {
  const output = preferredDirectoryOutput(outputs);
  if (!output) return;

  if (format === 'json') {
    logger.info(`Output: ${chalk.bold(output)}`);
  } else {
    logger.info(`Open: ${chalk.bold(pathToFileURL(output).href)}`);
  }
}

export function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Error: No input file specified');
    console.error('Run "wiremd --help" for usage information.\n');
    process.exit(1);
  }

  const options = parseArgs(args);
  if (!options) {
    process.exit(0);
  }

  const inputIsDir = existsSync(options.input) && statSync(options.input).isDirectory();

  if (inputIsDir) {
    const rootDir = resolve(options.input);

    const renderDirectory = (label: string) => {
      const outputs = generateDirectoryOutputs(options);
      const timestamp = chalk.dim(new Date().toLocaleTimeString());
      logger.success(`${label}: ${chalk.bold(outputs.length)} file${outputs.length === 1 ? '' : 's'} ${timestamp}`);
      logger.style(`Style: ${chalk.bold(options.style)}`);
      logger.format(`Format: ${chalk.bold(options.format)}`);
      return outputs;
    };

    if (!options.serve || options.watch) {
      try {
        logger.info(`Parsing directory: ${chalk.bold(options.input)}`);
        const outputs = renderDirectory(options.watch ? 'Generated' : 'Generated directory');
        if (!options.serve) {
          logDirectoryOpenAddress(outputs, options.format);
        }
        if (!options.watch && !options.serve) return;
        console.log('');
      } catch (error: any) {
        logger.error(`Directory generation failed: ${error.message}`);
        if (!options.watch) {
          if (error.stack) console.error(error.stack);
          process.exit(1);
        }
        logger.info('Watching for changes to retry...');
      }
    }

    if (options.watch || options.serve) {
      logger.watching(`Watching: ${chalk.bold(options.input)}`);
    }

    if (options.serve) {
      const indexFile = existsSync(join(rootDir, 'index.md')) ? 'index.md' : undefined;
      startServer({
        port: options.serve,
        autoIncrementPort: !options.servePortExplicit,
        maxPortRetries: 10,
        rootDir,
        inputFile: indexFile,
        renderFile: (mdPath: string) => generateOutput({ ...options, input: mdPath, showComments: true }),
      });
      console.log('');
    }

    const ignorePatterns = [
      '**/node_modules/**', '**/.git/**', '**/dist/**', '**/build/**',
      ...(options.ignorePattern ? [options.ignorePattern] : []),
    ];
    const watchPaths = options.watchPattern ? watchPathsForPattern(options.watchPattern) : [rootDir];
    logger.info(`Ignoring: ${chalk.gray(ignorePatterns.join(', '))}`);
    console.log('');

    const watcher = chokidar.watch(watchPaths, {
      ignored: ignorePatterns, persistent: true, ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 50 },
    });

    let isProcessing = false;
    let pendingRegeneration = false;

    const regenerateDirectory = async (filePath: string, event: string) => {
      if (!filePath.endsWith('.md')) return;
      if (!matchesWatchPattern(filePath, options.watchPattern)) return;

      if (isProcessing) {
        pendingRegeneration = true;
        return;
      }

      isProcessing = true;
      pendingRegeneration = false;

      try {
        logger.changed(`${chalk.bold(event)}: ${chalk.dim(filePath.replace(process.cwd(), '.'))}`);

        if (options.watch) {
          renderDirectory('Regenerated');
        }

        if (options.serve) {
          notifyReload();
        }
      } catch (error: any) {
        logger.error(`${error.message}`);
        if (error.stack) {
          console.log(chalk.dim(error.stack.split('\n').slice(1, 4).join('\n')));
        }
        if (options.serve) {
          notifyError(error.message);
        }
        logger.info('Watching for changes to retry...');
      } finally {
        isProcessing = false;
        if (pendingRegeneration) {
          setTimeout(() => regenerateDirectory(filePath, event), 50);
        }
      }
    };

    watcher
      .on('change', (path) => regenerateDirectory(path, 'changed'))
      .on('add', (path) => regenerateDirectory(path, 'added'))
      .on('unlink', (path) => {
        if (!path.endsWith('.md')) return;
        if (!matchesWatchPattern(path, options.watchPattern)) return;
        logger.warning(`Removed: ${chalk.dim(path.replace(process.cwd(), '.'))}`);
        if (options.watch) {
          try {
            renderDirectory('Regenerated');
          } catch (error: any) {
            logger.error(`${error.message}`);
          }
        }
        if (options.serve) notifyReload();
      })
      .on('error', (error: any) => {
        logger.error(`Watcher error: ${error.message}`);
        if (error.code === 'EMFILE') {
          logger.info('Too many files are being watched. Stop other watch processes or raise the OS file watcher limit.');
        }
        if (options.serve) {
          notifyError(error.message);
        }
      })
      .on('ready', () => logger.info('Watcher ready. Press Ctrl+C to stop.'));

    return;
  }

  if (!options.input.endsWith('.md')) {
    logger.error('Input file must use the .md extension');
    process.exit(1);
  }

  // Determine output path
  if (!options.output) {
    const ext = options.format === 'json' ? '.json' : '.html';
    options.output = options.input.replace(/\.md$/, ext);
  }

  // Watch mode
  if (options.watch || options.serve) {
    logger.watching(`Watching: ${chalk.bold(options.input)}`);

    // Initial generation
    try {
      const output = generateOutput(options);
      writeFileSync(options.output, output, 'utf-8');
      logger.success(`Generated: ${chalk.bold(options.output)}`);
      logger.style(`Style: ${chalk.bold(options.style)}`);
      logger.format(`Format: ${chalk.bold(options.format)}`);
      console.log('');
    } catch (error: any) {
      logger.error(`Initial generation failed: ${error.message}`);
      // Don't exit - continue watching for fixes
    }

    // Start dev server if requested
    if (options.serve) {
      const port = options.serve;
      startServer({
        port,
        autoIncrementPort: !options.servePortExplicit,
        maxPortRetries: 10,
        outputPath: options.output,
        renderFile: (mdPath: string) => generateOutput({ ...options, input: mdPath, showComments: true }),
        rootDir: dirname(options.input),
        inputFile: basename(options.input),
      });
      console.log('');
    }

    // Determine what to watch
    const watchPaths: string[] = [];
    const ignorePatterns: string[] = [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      '**/build/**',
    ];

    // Add custom ignore patterns
    if (options.ignorePattern) {
      ignorePatterns.push(options.ignorePattern);
    }

    // Determine watch paths based on options
    if (options.watchPattern) {
      // Watch using custom pattern
      watchPaths.push(...watchPathsForPattern(options.watchPattern));
      logger.info(`Watch pattern: ${chalk.bold(options.watchPattern)}`);
    } else {
      // Default: watch the input file and its directory for new .md files
      watchPaths.push(options.input);
      const inputDir = dirname(options.input);
      watchPaths.push(join(inputDir, '**/*.md'));
    }

    logger.info(`Ignoring: ${chalk.gray(ignorePatterns.join(', '))}`);
    console.log('');

    // Setup chokidar watcher with enhanced options
    const watcher = chokidar.watch(watchPaths, {
      ignored: ignorePatterns,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 50,
      },
      // Performance optimizations
      usePolling: false, // Use native fs.watch for better performance
      interval: 100,
      binaryInterval: 300,
    });

    // Track processing state to prevent concurrent regenerations
    let isProcessing = false;
    let pendingRegeneration = false;

    /**
     * Regenerate output with error recovery
     */
    const regenerate = async (filePath: string, event: string) => {
      if (!matchesWatchPattern(filePath, options.watchPattern)) return;

      // If already processing, mark for re-processing
      if (isProcessing) {
        pendingRegeneration = true;
        return;
      }

      isProcessing = true;
      pendingRegeneration = false;

      try {
        const relativePath = filePath.replace(process.cwd(), '.');
        logger.changed(`${chalk.bold(event)}: ${chalk.dim(relativePath)}`);

        // Check if file still exists (it might have been deleted)
        if (!existsSync(options.input)) {
          logger.warning('Input file deleted. Waiting for it to be restored...');
          isProcessing = false;
          return;
        }

        // Regenerate
        const output = generateOutput(options);
        writeFileSync(options.output!, output, 'utf-8');

        const timestamp = chalk.dim(new Date().toLocaleTimeString());
        logger.success(`Regenerated: ${chalk.bold(options.output!)} ${timestamp}`);

        // Notify live-reload clients
        if (options.serve) {
          notifyReload();
        }
      } catch (error: any) {
        logger.error(`${error.message}`);

        // Show stack trace for debugging if available
        if (error.stack) {
          console.log(chalk.dim(error.stack.split('\n').slice(1, 4).join('\n')));
        }

        // Notify error to live-reload clients
        if (options.serve) {
          notifyError(error.message);
        }

        // Don't crash - continue watching for fixes
        logger.info('Watching for changes to retry...');
      } finally {
        isProcessing = false;

        // If there was a pending regeneration request, process it now
        if (pendingRegeneration) {
          setTimeout(() => regenerate(filePath, event), 50);
        }
      }
    };

    // Watch for various file events
    watcher
      .on('change', (path) => regenerate(path, 'changed'))
      .on('add', (path) => {
        logger.info(`New file detected: ${chalk.dim(path.replace(process.cwd(), '.'))}`);
        regenerate(path, 'added');
      })
      .on('unlink', (path) => {
        if (!matchesWatchPattern(path, options.watchPattern)) return;

        const relativePath = path.replace(process.cwd(), '.');
        logger.warning(`File removed: ${chalk.dim(relativePath)}`);

        // If the main input file was deleted, notify but keep watching
        if (path === options.input) {
          logger.warning('Main input file deleted. Waiting for restoration...');
        }
      })
      .on('error', (error: any) => {
        logger.error(`Watcher error: ${error.message}`);
        // Don't crash - the watcher will try to recover
      })
      .on('ready', () => {
        logger.info(chalk.green('Watcher ready. Press Ctrl+C to stop.'));
      });

    // Graceful shutdown
    const shutdown = () => {
      console.log('');
      logger.info('Stopping watch mode...');
      watcher.close().then(() => {
        logger.success('Watch mode stopped.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    return;
  }

  // One-time generation
  logger.info(`Parsing: ${chalk.bold(options.input)}`);

  try {
    const output = generateOutput(options);

    // Write output
    writeFileSync(options.output, output, 'utf-8');
    logger.success(`Generated: ${chalk.bold(options.output)}`);
    logger.style(`Style: ${chalk.bold(options.style)}`);
    logger.format(`Format: ${chalk.bold(options.format)}`);
  } catch (error: any) {
    logger.error(`Generation failed: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Only run main() if this file is executed directly (not imported)
// Use pathToFileURL to handle Windows paths correctly
const isMainModule = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMainModule) {
  main();
}
