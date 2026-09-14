import { writeFileSync } from "node:fs";
import { smoke } from "./package-smoke.mjs";
const report = smoke({ versions: ["18.3.1"], next: false });
report.generatedAt = new Date().toISOString();
report.method =
  "npm-packed library installed in a clean Vite 5.4.21 / React 18.3.1 consumer; production default-viewer build including React. Each emitted JS/CSS asset is gzip-compressed separately at level 9. Lazy chunks are listed, not treated as initial downloads. The default viewer includes an inline PDF worker in its JavaScript; an additional standalone PDF worker is shipped in the tarball. No competitor comparison.";
for (const consumer of report.consumers) {
  consumer.totalEmittedBytes = consumer.assets.reduce(
    (sum, asset) => sum + asset.bytes,
    0,
  );
  consumer.totalEmittedGzipBytes = consumer.assets.reduce(
    (sum, asset) => sum + asset.gzipBytes,
    0,
  );
}
const json = JSON.stringify(report, null, 2) + "\n";
const output = process.argv
  .find((arg) => arg.startsWith("--output="))
  ?.slice(9);
if (output) writeFileSync(output, json);
console.log(json);
