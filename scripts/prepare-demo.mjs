import { copyFile, mkdir } from "node:fs/promises";

// Keep discovery files accessible next to the deployed Storybook site.
await mkdir("storybook-static", { recursive: true });
for (const file of ["llms.txt", "llms-full.txt", "structured-data.jsonld"]) {
  await copyFile(file, `storybook-static/${file}`);
}
console.log("Copied documentation discovery files into Storybook output.");
