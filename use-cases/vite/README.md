# Vite example

```sh
cd use-cases/vite
npm ci
npm run dev
```

Requires Node 22.22.1. This example imports the installed package, the default renderers, and the package stylesheet. Replace `public/sample.txt` and the document URI with your own file.

To test a local build, run `npm run build && npm run package:smoke` from the repository root. The smoke script installs the packed tarball into isolated copies of this example for React 17.0.2, 18.3.1, and 19.2.0. It selects `ReactDOM.render` for React 17 and `createRoot` for React 18/19.

`npm run measure:bundle -- --output=report.json` measures this production consumer's emitted JS/CSS, including React and lazy chunks. The report is an artifact-size measurement, not an initial-load or competitor benchmark.
