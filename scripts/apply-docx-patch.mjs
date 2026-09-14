import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const entry = fileURLToPath(import.meta.resolve("docx-preview-sync"));
const target = join(dirname(entry), "docx-preview.esm.js");
const original = readFileSync(target, "utf8");
const newline =
  original.match(/    renderElements\(children, parent\) \{(\r?\n)/)?.[1] ??
  "\n";
const before = [
  "    renderElements(children, parent) {",
  "        return __awaiter(this, void 0, void 0, function* () {",
  "            var _a, _b;",
].join(newline);
const after =
  before +
  newline +
  "            if (children == null)" +
  newline +
  "                return null;";
if (original.includes(after)) {
  console.log("DOCX null-children patch already applied.");
} else {
  if (original.split(before).length !== 2) {
    throw new Error(
      "DOCX patch source changed; inspect patches/docx-preview-sync+0.4.20.patch before building.",
    );
  }
  writeFileSync(target, original.replace(before, after));
  console.log("Applied DOCX null-children patch for the bundled renderer.");
}
