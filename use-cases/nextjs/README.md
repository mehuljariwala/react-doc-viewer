# Next.js example

Requires Node 22.22.1 (see the repository `.nvmrc`).

```sh
cd use-cases/nextjs
npm ci
npm run dev
```

This App Router example imports the published `@iamjariwala/react-doc-viewer` package and its stylesheet. `page.tsx` dynamically loads `viewer.tsx` with `ssr: false` because document rendering uses browser APIs. No source-directory import or external font download is required. Replace `public/sample.txt` and the document URI to preview your files.

To validate the current repository version instead of the published release, run from the repository root:

```sh
npm ci
npm run build
npm run package:smoke
```

The smoke script packs the current build into a tarball, copies this example into a temporary directory, installs that tarball with normal lifecycle scripts enabled, and runs the production Next.js build. It also verifies clean Vite consumers on React 17, 18, and 19. These are installation/build checks; they do not constitute browser interaction or server-rendering support for the viewer.
