---
id: security
title: Security and document privacy
---

# Security and document privacy

The rendering mode determines where documents go. Do not treat this package as an offline or confidential-document guarantee.

- **PDF and XLSX:** browser parsing. The browser still fetches remote document URLs. XLSX cells display as text and cached values; formulas and macros are not executed.
- **DOCX:** local preview by default, using `docx-preview-sync`. Setting `config.docx.useOfficeOnlineViewer: true` sends an HTTP(S) document URL to Microsoft's Office Online viewer.
- **DOC, XLS, PPT, PPTX and ODT:** `MSDocRenderer` embeds Microsoft Office Online for HTTP(S) URLs. Local/blob URLs receive a download card. The service must be able to fetch the URL; library request headers are not forwarded to it. Detection of failures inside a cross-origin iframe is limited.
- **Server conversion:** enabling `config.serverConversion` uploads eligible documents to the service you configure before rendering the returned PDF. Review its retention and authorization policies.
- **Embedded resources:** documents can refer to remote images, links or other resources. Local rendering alone does not mean there are no outbound requests.
- **HTML and Markdown:** DOMPurify sanitizes HTML output. This reduces risks but is not a blanket guarantee against XSS. Apply a content security policy appropriate for your application and keep dependencies updated.
- **Watermarks:** visual overlays are not access control or DRM.

For confidential documents, pass an explicit list of local renderers, leave Office Online disabled, avoid server conversion, and apply application-level controls for remote resources. Review the chosen parser and permitted inputs for your threat model.

```tsx
import DocViewer, {
  PDFRenderer,
  DocxRenderer,
  XLSXRenderer,
} from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

<DocViewer
  documents={documents}
  pluginRenderers={[PDFRenderer, DocxRenderer, XLSXRenderer]}
  config={{ docx: { useOfficeOnlineViewer: false } }}
/>;
```

XLSXRenderer is part of the next release; see the release status before using it from npm.
