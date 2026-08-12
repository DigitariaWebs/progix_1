// Node's --experimental-strip-types requires explicit file extensions on
// every relative import, unlike the TypeScript/Turbopack bundler resolution
// the actual app relies on. Source files stay extensionless (matching the
// rest of the codebase, proven with Turbopack) — this loader just retries a
// failed relative resolution with ".ts" appended, scoped to test scripts
// run directly under Node.
export async function resolve(specifier, context, nextResolve) {
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && !/\.[a-zA-Z0-9]+$/.test(specifier)) {
    try {
      return await nextResolve(`${specifier}.ts`, context);
    } catch {
      // Fall through — not every extensionless specifier is a local .ts file.
    }
  }
  return nextResolve(specifier, context);
}
