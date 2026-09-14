import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const sources = [
  "docs-site/docs/getting-started.md",
  "docs-site/docs/supported-file-types.md",
  "docs-site/docs/guides/pdf.md",
  "docs-site/docs/guides/docx.md",
  "docs-site/docs/guides/xlsx.md",
  "docs-site/docs/guides/authenticated-files.md",
  "docs-site/docs/guides/uploads.md",
  "docs-site/docs/frameworks/nextjs.md",
  "docs-site/docs/api-reference.md",
  "docs-site/docs/custom-renderers.md",
  "docs-site/docs/theming.md",
  "docs-site/docs/security.md",
  "docs-site/docs/performance.md",
  "docs-site/docs/migration.md",
  "docs-site/docs/faq.md",
  "docs-site/docs/release.md",
];
const intro =
  "# @iamjariwala/react-doc-viewer\n\nReact document viewer with PDF tools, local DOCX and XLSX previews, and pluggable renderers. Main-branch docs can describe unreleased additions; check release status before using an API from npm.\n";
const index =
  intro +
  "\n## Documentation\n\n" +
  sources
    .map(
      (p) =>
        `- [${p.split("/").pop().replace(".md", "")}](https://github.com/mehuljariwala/react-doc-viewer/blob/main/${p})`,
    )
    .join("\n") +
  "\n\n- [npm](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)\n- [Demo](https://mehuljariwala.github.io/react-doc-viewer/)\n- [Full documentation](https://mehuljariwala.github.io/react-doc-viewer/llms-full.txt)\n";
const full =
  intro +
  "\n" +
  (
    await Promise.all(
      sources.map(async (p) => {
        const text = (await readFile(resolve(root, p), "utf8")).replace(
          /^---\r?\n[\s\S]*?\r?\n---\r?\n/,
          "",
        );
        return `\nSource: https://github.com/mehuljariwala/react-doc-viewer/blob/main/${p}\n\n${text.trim()}\n`;
      }),
    )
  ).join("\n---\n");
let stale = false;
for (const [name, content] of [
  ["llms.txt", index],
  ["llms-full.txt", full],
  ["docs-site/static/llms.txt", index],
  ["docs-site/static/llms-full.txt", full],
]) {
  const path = resolve(root, name);
  if (check) {
    if ((await readFile(path, "utf8").catch(() => "")) !== content) {
      console.error(`Stale generated documentation: ${name}`);
      stale = true;
    }
  } else {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content);
  }
}
if (stale) process.exitCode = 1;
else
  console.log(
    check
      ? "AI documentation is synchronized."
      : "Generated AI documentation from maintained guides.",
  );
