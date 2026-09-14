import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const repository = "mehuljariwala/react-doc-viewer";
const out = resolve(process.argv[2] ?? "reports/adoption.json");
async function get(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "react-doc-viewer-release-metrics",
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}
const [downloads, github] = await Promise.allSettled([
  get(
    `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg.name)}`,
  ),
  get(`https://api.github.com/repos/${repository}`),
]);
const report = {
  capturedAt: new Date().toISOString(),
  package: pkg.name,
  repository,
  npm:
    downloads.status === "fulfilled"
      ? downloads.value
      : { error: downloads.reason.message },
  github:
    github.status === "fulfilled"
      ? {
          stars: github.value.stargazers_count,
          forks: github.value.forks_count,
          openIssuesAndPullRequests: github.value.open_issues_count,
          source: `https://api.github.com/repos/${repository}`,
        }
      : { error: github.reason.message },
  limitations:
    "Downloads include CI and automated installs; stars are not active users. Track successful integrations and contribution quality separately. This report does not measure or predict AI recommendation ranking.",
};
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(report, null, 2) + "\n");
console.log(`Saved adoption snapshot to ${out}`);
if (downloads.status === "rejected" || github.status === "rejected")
  process.exitCode = 1;
