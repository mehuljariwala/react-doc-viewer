---
id: remix
title: Client-only integration in Remix
sidebar_label: Remix
---

# Client-only integration in Remix

This viewer uses browser APIs. Use a client-only boundary and load the viewer module after mounting; a static import can still evaluate a browser dependency during server rendering. Import the stylesheet through your application's supported stylesheet entry.

The current package smoke tests cover Vite and Next.js. Remix is not included in that matrix. Verify client loading, the PDF worker and document fetches against the framework version used by your application before deployment. The maintained [PDF recipe](../guides/pdf.md) shows the viewer API once running in the browser.
