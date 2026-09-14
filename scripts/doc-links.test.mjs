import { describe, expect, it } from "vitest";
import { rewriteDocLinks } from "./doc-links.mjs";

const source = "docs-site/docs/guides/pdf.md";
const repo = "https://github.com/mehuljariwala/react-doc-viewer/blob/main/";

describe("links in generated AI documentation", () => {
  it("resolves sibling and parent guides relative to their source file", () => {
    expect(
      rewriteDocLinks(
        "[XLSX](xlsx.md) [Privacy](../security.md#privacy)",
        source,
      ),
    ).toBe(
      `[XLSX](${repo}docs-site/docs/guides/xlsx.md) [Privacy](${repo}docs-site/docs/security.md#privacy)`,
    );
  });
  it("resolves docs routes and image paths to repository files", () => {
    expect(
      rewriteDocLinks(
        "[API](/docs/api-reference) ![Preview](/img/xlsx-preview.png)",
        source,
      ),
    ).toBe(
      `[API](${repo}docs-site/docs/api-reference.md) ![Preview](${repo}docs-site/static/img/xlsx-preview.png)`,
    );
  });
  it("anchors refer to the source rather than ambiguous concatenated headings", () => {
    expect(rewriteDocLinks("[Setup](#setup)", source)).toBe(
      `[Setup](${repo}${source}#setup)`,
    );
  });
  it("preserves external URLs and email destinations", () => {
    const markdown =
      "[Site](https://example.com/a) [Mail](mailto:hello@example.com)";
    expect(rewriteDocLinks(markdown, source)).toBe(markdown);
  });
  it("preserves fenced, indented and inline code", () => {
    const markdown =
      "```md\n[Sample](example.md)\n```\n    [Indented](example.md)\n`[Inline](example.md)`\n[Real](xlsx.md)";
    expect(rewriteDocLinks(markdown, source)).toBe(
      markdown.replace(
        "[Real](xlsx.md)",
        `[Real](${repo}docs-site/docs/guides/xlsx.md)`,
      ),
    );
  });
  it("resolves reference definitions and preserves titles", () => {
    expect(
      rewriteDocLinks(
        '[guide]: ../security.md "Privacy"\n[PDF](pdf.md "PDF guide")',
        source,
      ),
    ).toBe(
      `[guide]: ${repo}docs-site/docs/security.md "Privacy"\n[PDF](${repo}docs-site/docs/guides/pdf.md "PDF guide")`,
    );
  });
  it("supports angle-wrapped destinations with spaces", () => {
    expect(rewriteDocLinks("[Sample](<sample file.md>)", source)).toBe(
      `[Sample](<${repo}docs-site/docs/guides/sample%20file.md>)`,
    );
  });
});
