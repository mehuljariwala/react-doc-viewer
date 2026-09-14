const repository =
  "https://github.com/mehuljariwala/react-doc-viewer/blob/main/";
const docsSite = "https://mehuljariwala.github.io/react-doc-viewer-docs/";

/** Resolve a maintained guide's Markdown destinations before concatenating it. */
export function rewriteDocLinks(markdown, source) {
  const destination = (value) => {
    const wrapped = value.startsWith("<") && value.endsWith(">");
    const target = wrapped ? value.slice(1, -1) : value;
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target)) return value;
    let url;
    if (target.startsWith("/docs/")) {
      url = new URL(`docs-site${target}`, repository);
      if (!/\.(md|mdx)$/.test(url.pathname)) url.pathname += ".md";
    } else if (target.startsWith("/img/")) {
      url = new URL(`docs-site/static${target}`, repository);
    } else if (target.startsWith("/")) {
      url = new URL(target.slice(1), docsSite);
    } else {
      url = new URL(target, repository + source);
    }
    return wrapped ? `<${url.href}>` : url.href;
  };
  const rewriteText = (text) =>
    text
      .replace(
        /(\]\(\s*)(<[^>\n]+>|[^\s)]+)/g,
        (_, prefix, target) => prefix + destination(target),
      )
      .replace(
        /^( {0,3}\[[^\]]+\]:\s*)(<[^>\n]+>|[^\s]+)/,
        (_, prefix, target) => prefix + destination(target),
      );
  let fence;
  return markdown
    .split("\n")
    .map((line) => {
      const marker = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
      if (fence) {
        if (
          marker &&
          marker[1][0] === fence[0] &&
          marker[1].length >= fence.length &&
          !marker[2].trim()
        )
          fence = undefined;
        return line;
      }
      if (marker) {
        fence = marker[1];
        return line;
      }
      if (/^(?: {4}|\t)/.test(line)) return line;
      // Leave inline examples untouched, just as fenced code blocks are untouched.
      let output = "";
      let start = 0;
      for (const match of line.matchAll(/(`+)(.*?)\1/g)) {
        output += rewriteText(line.slice(start, match.index)) + match[0];
        start = match.index + match[0].length;
      }
      return output + rewriteText(line.slice(start));
    })
    .join("\n");
}
