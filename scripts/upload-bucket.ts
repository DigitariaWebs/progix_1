#!/usr/bin/env bun
/**
 * General-purpose uploader: pushes a local directory to a Supabase
 * Storage bucket, preserving original file names.
 *
 * Env required:
 *   SUPABASE_URL                (e.g. https://lgpngbxkeuyvjcgrftxa.supabase.co)
 *   SUPABASE_SERVICE_ROLE_KEY   (service_role JWT or sb_secret_ key)
 *
 * Usage:
 *   bun scripts/upload-bucket.ts <srcDir> <bucket> <destPrefix> [--recursive]
 *
 * Example:
 *   bun scripts/upload-bucket.ts public/labo/Al-aqd Projix Projects/Al-aqd
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, extname, relative, isAbsolute } from 'node:path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const args = process.argv.slice(2);
const recursive = args.includes('--recursive');
const positional = args.filter((a) => !a.startsWith('--'));

if (positional.length < 3) {
  console.error(
    'Usage: bun scripts/upload-bucket.ts <srcDir> <bucket> <destPrefix> [--recursive]',
  );
  process.exit(1);
}

const [srcDirArg, bucket, destPrefixArg] = positional;
const srcDir = isAbsolute(srcDirArg)
  ? srcDirArg
  : join(process.cwd(), srcDirArg);
const destPrefix = destPrefixArg.replace(/\/+$/, '');

const MIME: Record<string, string> = {
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
};

async function collect(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (recursive) out.push(...(await collect(full)));
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

const st = await stat(srcDir);
if (!st.isDirectory()) {
  console.error(`Not a directory: ${srcDir}`);
  process.exit(1);
}

const files = await collect(srcDir);
console.log(`Uploading ${files.length} file(s) → ${bucket}/${destPrefix}/`);

for (const localPath of files) {
  const rel = relative(srcDir, localPath).split(/[\\/]/).join('/');
  const remotePath = `${destPrefix}/${rel}`;
  const body = new Uint8Array(await readFile(localPath));
  const mime =
    MIME[extname(localPath).toLowerCase()] ?? 'application/octet-stream';

  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encodeURI(remotePath)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': mime,
      'x-upsert': 'true',
    },
    body,
  });

  if (!res.ok) {
    console.error(`FAIL ${remotePath}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  console.log(`OK   ${remotePath} (${body.byteLength} bytes)`);
}

console.log('Done.');
