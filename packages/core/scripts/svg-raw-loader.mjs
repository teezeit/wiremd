import { readFile } from 'node:fs/promises';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith('.svg?raw')) {
    const resolved = await nextResolve(specifier.slice(0, -'?raw'.length), context);
    return {
      ...resolved,
      url: `${resolved.url}?raw`,
    };
  }

  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.svg?raw')) {
    const source = await readFile(new URL(url.slice(0, -'?raw'.length)), 'utf8');
    return {
      format: 'module',
      shortCircuit: true,
      source: `export default ${JSON.stringify(source)};`,
    };
  }

  return nextLoad(url, context);
}
