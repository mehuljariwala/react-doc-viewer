import { useMemo } from "react";
import DOMPurify from "dompurify";
import { DocRenderer } from "../..";
import { textFileLoader } from "../../utils/fileLoaders";

function parseMarkdown(md: string): string {
  let html = md;

  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");

  html = html
    .replace(/^######\s+(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>")
    .replace(/^####\s+(.+)$/gm, "<h4>$1</h4>")
    .replace(/^###\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  html = html.replace(/^[-*_]{3,}$/gm, "<hr />");

  html = html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>");

  html = html
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>");

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" style="max-width:100%" />',
  );
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  html = html.replace(/^[\t ]*[-*+]\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/^[\t ]*\d+\.\s+(.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*?<\/li>\s*)+)/g, "<ul>$1</ul>");

  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<(h[1-6]|pre|hr|ul|ol|li)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

const MarkdownRenderer: DocRenderer = ({
  mainState: { currentDocument },
}) => {
  const htmlContent = useMemo(() => {
    if (!currentDocument?.fileData) return "";
    const rawHtml = parseMarkdown(currentDocument.fileData as string);
    return DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ["img"],
      ADD_ATTR: ["target", "rel"],
    });
  }, [currentDocument?.fileData]);

  return (
    <div id="markdown-renderer" className="rdv-markdown-container">
      <div
        className="rdv-markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default MarkdownRenderer;

MarkdownRenderer.fileTypes = ["md", "text/markdown", "text/x-markdown"];
MarkdownRenderer.weight = 0;
MarkdownRenderer.fileLoader = textFileLoader;
