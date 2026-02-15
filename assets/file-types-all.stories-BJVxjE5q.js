import{j as e,D as a,a as o}from"./DocViewer-B7ekdZ3S.js";import{p as m}from"./pdf-file-DmCB9yVW.js";import{d as p,t as s,m as f,r as d}from"./rtf-file-CE_FO-hL.js";import{c}from"./csv-file-DrieSr-z.js";import{j as u,g,b as x}from"./bmp-image-BG0NKc2T.js";import{p as F,w as y}from"./webp-file-Bt4OxBRh.js";import"./index-CDs2tPxN.js";import"./index-BKD8Dact.js";import"./index-BAMY2Nnw.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./iframe-BRyD-XD9.js";import"../sb-preview/runtime.js";import"./tiny-invariant-CopsF_GD.js";const E={title:"DocViewer/File Types/All"},i=()=>{const t=[{uri:m,fileName:"document.pdf"},{uri:p,fileName:"document.docx",fileType:"docx"},{uri:s,fileName:"readme.txt",fileType:"text/plain"},{uri:f,fileName:"README.md",fileType:"text/markdown"},{uri:d,fileName:"document.rtf",fileType:"application/rtf"},{uri:c,fileName:"data.csv"},{uri:u,fileName:"photo.jpg"},{uri:F,fileName:"image.png"},{uri:g,fileName:"animation.gif"},{uri:x,fileName:"image.bmp"},{uri:y,fileName:"image.webp"}];return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"All File Types"}),e.jsx("span",{style:{fontSize:"12px",color:"#666",marginLeft:"10px"},children:"Navigate between PDF, DOCX, TXT, MD, RTF, CSV, JPG, PNG, GIF, BMP, WebP"})]}),e.jsx("div",{style:{flex:1},children:e.jsx(a,{documents:t,pluginRenderers:o,config:{pdfVerticalScrollByDefault:!0,csvDelimiter:","}})})]})};i.__docgenInfo={description:"",methods:[],displayName:"AllFileTypes"};var n,l,r;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const allDocs: IDocument[] = [{
    uri: pdfFile,
    fileName: "document.pdf"
  }, {
    uri: docxFile,
    fileName: "document.docx",
    fileType: "docx"
  }, {
    uri: txtFile,
    fileName: "readme.txt",
    fileType: "text/plain"
  }, {
    uri: mdFile,
    fileName: "README.md",
    fileType: "text/markdown"
  }, {
    uri: rtfFile,
    fileName: "document.rtf",
    fileType: "application/rtf"
  }, {
    uri: csvFile,
    fileName: "data.csv"
  }, {
    uri: jpgFile,
    fileName: "photo.jpg"
  }, {
    uri: pngFile,
    fileName: "image.png"
  }, {
    uri: gifFile,
    fileName: "animation.gif"
  }, {
    uri: bmpFile,
    fileName: "image.bmp"
  }, {
    uri: webpFile,
    fileName: "image.webp"
  }];
  return <div style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      padding: "10px",
      background: "#f0f0f0"
    }}>
        <strong>All File Types</strong>
        <span style={{
        fontSize: "12px",
        color: "#666",
        marginLeft: "10px"
      }}>
          Navigate between PDF, DOCX, TXT, MD, RTF, CSV, JPG, PNG, GIF, BMP, WebP
        </span>
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer documents={allDocs} pluginRenderers={DocViewerRenderers} config={{
        pdfVerticalScrollByDefault: true,
        csvDelimiter: ","
      }} />
      </div>
    </div>;
}`,...(r=(l=i.parameters)==null?void 0:l.docs)==null?void 0:r.source}}};const G=["AllFileTypes"];export{i as AllFileTypes,G as __namedExportsOrder,E as default};
