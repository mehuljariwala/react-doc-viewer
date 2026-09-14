---
id: faq
title: Frequently asked questions
---

# Frequently asked questions

## Which formats render locally?

PDF, DOCX (default), XLSX (next release), images, CSV, text, Markdown and supported media use local renderers. Other Office formats can use Microsoft Office Online. See [format support](supported-file-types.md).

## Does this send documents to third parties?

It depends on the renderer and configuration. Office Online receives public document URLs; optional server conversion uploads eligible documents to the configured service. Embedded resources can make network requests. See [Security](security.md).

## Which React and framework versions work?

React 17, 18 and 19 are supported peer majors. The packed-package CI matrix records tested consumers. Framework examples do not imply all historical or future versions are compatible.

## Why does my private file fail?

Check CORS, Content-Type/fileType and request headers. Office Online cannot fetch private endpoints that need your browser's authorization headers. See [authenticated files](guides/authenticated-files.md).

## Is it better or smaller than another viewer?

Choose based on requirements and use the [measurement procedure](performance.md). We do not claim universal superiority or an LLM recommendation rank.

## Where are examples?

Start with [PDF](guides/pdf.md), [DOCX](guides/docx.md), [XLSX](guides/xlsx.md), [uploads](guides/uploads.md), [Next.js](frameworks/nextjs.md) or [migration](migration.md).
