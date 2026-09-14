import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageName = "@iamjariwala/react-doc-viewer";
function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
      npm_config_loglevel: "error",
    },
  });
}
function filesBelow(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? filesBelow(join(path, entry.name))
      : [join(path, entry.name)],
  );
}
export function measureAssets(directory) {
  return filesBelow(directory)
    .filter((file) => /\.(js|css)$/.test(file))
    .map((file) => {
      const bytes = readFileSync(file);
      return {
        file: file.slice(directory.length + 1),
        bytes: bytes.length,
        gzipBytes: gzipSync(bytes, { level: 9 }).length,
      };
    });
}
export function smoke({
  versions = ["17.0.2", "18.3.1", "19.2.0"],
  next = true,
} = {}) {
  const temp = mkdtempSync(join(tmpdir(), "react-doc-viewer-smoke-"));
  const results = [];
  try {
    const [packed] = JSON.parse(
      run(
        "npm",
        ["pack", "--json", "--ignore-scripts", "--pack-destination", temp],
        root,
      ),
    );
    const tarball = join(temp, packed.filename);
    const packedFiles = packed.files.map((file) => file.path);
    for (const required of [
      "dist/index.d.ts",
      "dist/index.css",
      "dist/react-doc-viewer.js",
      "dist/react-doc-viewer.cjs",
      "dist/pdf.worker.mjs",
    ])
      assert(
        packedFiles.includes(required),
        `Missing ${required}; run npm run build first.`,
      );
    assert(
      packedFiles.every(
        (file) => !file.startsWith("src/") && !file.startsWith("node_modules/"),
      ),
    );
    for (const version of versions) {
      const dir = join(temp, `react-${version}`);
      cpSync(join(root, "use-cases/vite"), dir, {
        recursive: true,
        filter: (source) =>
          !/(?:^|\/)(node_modules|dist|package-lock.json)(?:\/|$)/.test(source),
      });
      const manifest = JSON.parse(
        readFileSync(join(dir, "package.json"), "utf8"),
      );
      manifest.dependencies = {
        ...manifest.dependencies,
        [packageName]: `file:${tarball}`,
        react: version,
        "react-dom": version,
      };
      manifest.devDependencies = {
        ...manifest.devDependencies,
        typescript: "5.9.3",
        "@types/react": version.startsWith("17")
          ? "17.0.90"
          : version.startsWith("18")
            ? "18.3.27"
            : "19.2.2",
        "@types/react-dom": version.startsWith("17")
          ? "17.0.26"
          : version.startsWith("18")
            ? "18.3.7"
            : "19.2.2",
      };
      writeFileSync(
        join(dir, "package.json"),
        JSON.stringify(manifest, null, 2),
      );
      if (version.startsWith("17")) {
        const main = join(dir, "src/main.jsx");
        writeFileSync(
          main,
          readFileSync(main, "utf8")
            .replace(
              'import { createRoot } from "react-dom/client";',
              'import ReactDOM from "react-dom";',
            )
            .replace(
              'createRoot(document.getElementById("root")).render(',
              "ReactDOM.render(",
            )
            .replace(/\);\s*$/, 'document.getElementById("root"));\n'),
        );
      }
      // Lifecycle scripts are enabled deliberately: consumers must install without patch-package or npx.
      run("npm", ["install", "--no-audit", "--no-fund"], dir);
      run("npm", ["ls", "react", "react-dom"], dir);
      const installed = JSON.parse(
        readFileSync(
          join(dir, "node_modules", packageName, "package.json"),
          "utf8",
        ),
      );
      const installedDirectory = join(dir, "node_modules", packageName);
      assert(
        readFileSync(
          join(installedDirectory, "dist/index.css"),
          "utf8",
        ).includes("xlsx"),
        "XLSX stylesheet missing from public CSS entry",
      );
      assert(
        readFileSync(
          join(installedDirectory, "dist/pdf.worker.mjs"),
          "utf8",
        ).includes("WorkerMessageHandler"),
        "PDF worker asset is invalid",
      );
      for (const hook of ["preinstall", "install", "postinstall"])
        assert(
          !installed.scripts?.[hook],
          `Consumer lifecycle hook present: ${hook}`,
        );
      run(
        "node",
        [
          "--input-type=module",
          "-e",
          `import {createRequire} from 'node:module';import assert from 'node:assert/strict';const require=createRequire(import.meta.url);assert(require.resolve('${packageName}').endsWith('.cjs'));assert(import.meta.resolve('${packageName}').endsWith('.js'));assert(require.resolve('${packageName}/dist/index.css').endsWith('.css'));assert(require.resolve('${packageName}/dist/pdf.worker.mjs').endsWith('.mjs'));`,
        ],
        dir,
      );
      writeFileSync(
        join(dir, "types.tsx"),
        `import React from 'react'; import Viewer, { DocViewerRenderers, XLSXRenderer, type IDocument } from '${packageName}'; const documents: IDocument[] = []; export const viewer = <Viewer documents={documents} pluginRenderers={[...DocViewerRenderers, XLSXRenderer]} />;`,
      );
      run(
        "npx",
        [
          "--no-install",
          "tsc",
          "--noEmit",
          "--skipLibCheck",
          "--esModuleInterop",
          "--moduleResolution",
          "bundler",
          "--module",
          "esnext",
          "--jsx",
          "react",
          "--lib",
          "es2022,dom",
          "types.tsx",
        ],
        dir,
      );
      const buildOutput = run("npm", ["run", "build"], dir);
      assert(existsSync(join(dir, "dist/index.html")));
      // Also bundle the CommonJS entry in a browser target; direct Node execution is not an SSR guarantee.
      writeFileSync(
        join(dir, "cjs-entry.cjs"),
        `const viewer = require('${packageName}'); console.log(viewer.default, viewer.DocViewerRenderers);`,
      );
      run(
        "npx",
        [
          "--no-install",
          "esbuild",
          "cjs-entry.cjs",
          "--bundle",
          "--platform=browser",
          "--outfile=cjs-bundle.js",
        ],
        dir,
      );
      results.push({
        consumer: `vite-react-${version}`,
        assets: measureAssets(join(dir, "dist")),
      });
      console.log(
        `PASS packed Vite React ${version}: peer resolution, ESM/CJS browser builds, declarations, CSS and PDF worker exports.`,
      );
      if (process.env.SMOKE_VERBOSE) console.log(buildOutput);
    }
    if (next) {
      const dir = join(temp, "nextjs");
      cpSync(join(root, "use-cases/nextjs"), dir, {
        recursive: true,
        filter: (source) =>
          !/(?:^|\/)(node_modules|\.next|package-lock.json)(?:\/|$)/.test(
            source,
          ),
      });
      const manifest = JSON.parse(
        readFileSync(join(dir, "package.json"), "utf8"),
      );
      manifest.dependencies[packageName] = `file:${tarball}`;
      writeFileSync(
        join(dir, "package.json"),
        JSON.stringify(manifest, null, 2),
      );
      run("npm", ["install", "--no-audit", "--no-fund"], dir);
      run("npm", ["ls", "react", "react-dom"], dir);
      console.log(run("npm", ["run", "build"], dir));
      assert(existsSync(join(dir, ".next/BUILD_ID")));
      results.push({
        consumer: `next-${manifest.dependencies.next}`,
        assets: measureAssets(join(dir, ".next/static")),
      });
      console.log(
        "PASS packed Next.js production build with browser-only viewer boundary.",
      );
    }
    return {
      node: process.version,
      package: `${packageName}@${packed.version}`,
      tarballIntegrity: packed.integrity,
      npm: run("npm", ["--version"], root).trim(),
      tarballBytes: packed.size,
      unpackedBytes: packed.unpackedSize,
      consumers: results,
    };
  } finally {
    if (process.env.KEEP_SMOKE_TEMP)
      console.log(`Smoke directory retained: ${temp}`);
    else rmSync(temp, { recursive: true, force: true });
  }
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const requested = process.argv
    .find((arg) => arg.startsWith("--react="))
    ?.split("=")[1];
  smoke({
    ...(requested ? { versions: [requested] } : {}),
    next: !process.argv.includes("--skip-next"),
  });
}
