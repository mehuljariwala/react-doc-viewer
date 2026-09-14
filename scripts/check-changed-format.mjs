import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import * as prettier from "prettier";
const base = process.env.FORMAT_BASE || "HEAD";
const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8" }).split("\0").filter(Boolean);
const files = new Set([
  ...git("diff", "--name-only", "--diff-filter=ACMR", "-z", base),
  ...git("ls-files", "--others", "--exclude-standard", "-z"),
]);
let failed = false;
for (const file of files) {
  if (!existsSync(file)) continue;
  const info = await prettier.getFileInfo(file, {
    ignorePath: ".prettierignore",
  });
  if (info.ignored || !info.inferredParser) continue;
  const config = await prettier.resolveConfig(file);
  if (
    !(await prettier.check(readFileSync(file, "utf8"), {
      ...config,
      filepath: file,
    }))
  ) {
    console.error(`Formatting required: ${file}`);
    failed = true;
  }
}
if (failed) process.exitCode = 1;
else console.log("Changed files match Prettier formatting.");
