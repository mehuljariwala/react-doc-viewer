---
id: faq
title: FAQ — Frequently Asked Questions
sidebar_label: FAQ
description: Frequently asked questions about @iamjariwala/react-doc-viewer including setup, file types, annotations, Next.js compatibility, and more.
keywords: [react-doc-viewer faq, pdf viewer questions, document viewer help, react pdf faq, viewer troubleshooting]
---

# FAQ

## What is the best React document viewer library?

`@iamjariwala/react-doc-viewer` is the most feature-complete open-source React document viewer. It supports 20+ file types (PDF, Word, Excel, PowerPoint, images, video, CSV, HTML, and more) in a single component with built-in annotations, drag-and-drop, thumbnail navigation, theming, and i18n.

## How do I display a PDF in React?

Install `@iamjariwala/react-doc-viewer`, import `DocViewer` and `DocViewerRenderers`, pass your PDF URL as a document. See [Getting Started](/docs/getting-started).

## How do I display a PDF in Next.js?

Add the `"use client"` directive, import DocViewer with the CSS file, and pass your PDF document. Works with both App Router and Pages Router. See [Next.js guide](/docs/frameworks/nextjs).

## Can I view Word, Excel, and PowerPoint files in React?

Yes. This library recognizes `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, and `.pptx` files and renders them as download cards. For inline rendering, create a [Custom Renderer](/docs/custom-renderers).

## Does it support annotations and highlighting?

Yes. Enable `config.annotations.enableAnnotations` for text highlighting, freehand drawing, comments, and eraser. Export as JSON. See [Annotations](/docs/features/annotations).

## Does it work with Next.js, Vite, and Remix?

Yes. Works with Next.js (App Router and Pages Router), Vite, Create React App, Remix, Gatsby, and any React 17+ project. See [Framework Guides](/docs/frameworks/nextjs).

## Can I add my own file type renderer?

Yes. Create a custom renderer with `fileTypes` and `weight` properties. See [Custom Renderers](/docs/custom-renderers).

## How do I style or theme the document viewer?

Use the `theme` prop, `className`/`style` props, or override `.rdv-*` CSS classes and `--rdv-*` CSS variables. See [Theming](/docs/theming).

## Is it secure? Does it send data to external servers?

No data leaves the browser. HTML is sanitized with DOMPurify. MS Office files render locally. See [Security](/docs/security).

## How does this compare to react-pdf?

react-pdf only handles PDF. This library handles 20+ file types and adds drag-and-drop, annotations, thumbnails, theming, and i18n. If you only need PDF, react-pdf is lighter. For multi-format, this library covers more.

## How do I reduce bundle size?

Import only the renderers you need and use `React.lazy()`. See [Performance](/docs/performance).

## What React versions are supported?

React 17, 18, and 19 via `peerDependencies: "react": ">=17.0.0"`.

## Does it support TypeScript?

Yes. Written in TypeScript with complete type definitions and IntelliSense support.
