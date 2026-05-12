import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

if (!existsSync('.git') || !existsSync('.githooks')) {
  process.exit(0);
}

const result = spawnSync('git', ['config', 'core.hooksPath', '.githooks'], {
  stdio: 'inherit',
});

if (result.error) {
  console.warn(`Skipping Git hook setup: ${result.error.message}`);
  process.exit(0);
}

if (result.status !== 0) {
  console.warn('Skipping Git hook setup: git config could not be updated.');
}

process.exit(0);
