---
id: nextjs
title: Using the viewer with Next.js
sidebar_label: Next.js
---

# Next.js integration

Use a client component with a browser-only dynamic import. A `"use client"` directive alone does not disable server prerendering of browser-dependent dependencies.

Create `app/viewer.tsx`:

```tsx
"use client";
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function Viewer() {
  return (
    <DocViewer
      documents={[{ uri: "/sample.pdf", fileType: "pdf" }]}
      pluginRenderers={DocViewerRenderers}
      style={{ height: 600 }}
    />
  );
}
```

Create `app/page.tsx`:

```tsx
"use client";
import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("./viewer"), {
  ssr: false,
  loading: () => <p>Loading viewer…</p>,
});

export default function Page() {
  return <Viewer />;
}
```

Put a file at `public/sample.pdf`. Keep global CSS imports in an allowed location for your Next.js router. In Pages Router, import the package CSS from `pages/_app.tsx` and use the same browser-only dynamic boundary.

The repository's [Next.js example](https://github.com/mehuljariwala/react-doc-viewer/tree/main/use-cases/nextjs) consumes the packed npm package. The CI matrix records the tested Next/React versions; it does not cover every historical framework version.
