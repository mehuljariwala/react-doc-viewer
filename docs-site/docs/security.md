---
id: security
title: Security
sidebar_label: Security
description: Security features of @iamjariwala/react-doc-viewer including DOMPurify HTML sanitization, no external services, and client-side rendering.
keywords: [react viewer security, pdf viewer xss, html sanitization react, secure document viewer, dompurify react]
---

# Security

- **HTML sanitization** — All HTML content is sanitized with [DOMPurify](https://github.com/cure53/DOMPurify) before rendering. Script tags, object embeds, and form elements are stripped.
- **No external services** — All document rendering happens client-side. No file data is sent to third-party servers.
- **No external iframes** — MS Office documents render as local download cards instead of being sent to Microsoft's viewing service.
- **Sandboxed HTML** — HTML documents render inside an iframe with sanitized content.
