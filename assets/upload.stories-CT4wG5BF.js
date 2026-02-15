import{j as t,D as m,a as u}from"./DocViewer-B7ekdZ3S.js";import{r as g}from"./index-CDs2tPxN.js";import{p as x}from"./pdf-file-DmCB9yVW.js";import"./index-BKD8Dact.js";import"./index-BAMY2Nnw.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./iframe-BRyD-XD9.js";import"../sb-preview/runtime.js";import"./tiny-invariant-CopsF_GD.js";const T={title:"DocViewer/Upload"},r=()=>{const[l,i]=g.useState([]);return t.jsxs(t.Fragment,{children:[t.jsx("input",{type:"file",accept:".pdf",multiple:!0,onChange:e=>{var n;return((n=e.target.files)==null?void 0:n.length)&&i(Array.from(e.target.files))}}),t.jsx(m,{documents:l.map(e=>({uri:window.URL.createObjectURL(e),fileName:e.name})),pluginRenderers:u})]})},s=()=>{const[l,i]=g.useState([]);return t.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[t.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[t.jsx("strong",{children:"Upload Any File"}),t.jsx("div",{style:{fontSize:"12px",color:"#666",marginTop:"4px"},children:"Supports: PDF, DOCX, DOC, TXT, MD, RTF, CSV, JPG, PNG, GIF, BMP, WebP, TIFF, HTML"}),t.jsx("input",{type:"file",accept:".pdf,.docx,.doc,.txt,.md,.rtf,.csv,.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff,.tif,.html,.htm,.xlsx,.xls,.pptx,.ppt",multiple:!0,onChange:e=>{var n;return((n=e.target.files)==null?void 0:n.length)&&i(Array.from(e.target.files))},style:{marginTop:"8px"}})]}),t.jsx("div",{style:{flex:1},children:t.jsx(m,{documents:l.length>0?l.map(e=>({uri:window.URL.createObjectURL(e),fileName:e.name})):[{uri:x,fileName:"default.pdf"}],pluginRenderers:u,config:{pdfVerticalScrollByDefault:!0,csvDelimiter:","}})})]})};r.__docgenInfo={description:"",methods:[],displayName:"PDFInput"};s.__docgenInfo={description:"",methods:[],displayName:"FileUploadAllTypes"};var o,p,c;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  return <>
      <input type="file" accept=".pdf" multiple onChange={el => el.target.files?.length && setSelectedDocs(Array.from(el.target.files))} />
      <DocViewer documents={selectedDocs.map(file => ({
      uri: window.URL.createObjectURL(file),
      fileName: file.name
    }))} pluginRenderers={DocViewerRenderers} />
    </>;
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var a,d,f;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  return <div style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      padding: "10px",
      background: "#f0f0f0"
    }}>
        <strong>Upload Any File</strong>
        <div style={{
        fontSize: "12px",
        color: "#666",
        marginTop: "4px"
      }}>
          Supports: PDF, DOCX, DOC, TXT, MD, RTF, CSV, JPG, PNG, GIF, BMP, WebP, TIFF, HTML
        </div>
        <input type="file" accept=".pdf,.docx,.doc,.txt,.md,.rtf,.csv,.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff,.tif,.html,.htm,.xlsx,.xls,.pptx,.ppt" multiple onChange={el => el.target.files?.length && setSelectedDocs(Array.from(el.target.files))} style={{
        marginTop: "8px"
      }} />
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer documents={selectedDocs.length > 0 ? selectedDocs.map(file => ({
        uri: window.URL.createObjectURL(file),
        fileName: file.name
      })) : [{
        uri: pdfFile,
        fileName: "default.pdf"
      }]} pluginRenderers={DocViewerRenderers} config={{
        pdfVerticalScrollByDefault: true,
        csvDelimiter: ","
      }} />
      </div>
    </div>;
}`,...(f=(d=s.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};const U=["PDFInput","FileUploadAllTypes"];export{s as FileUploadAllTypes,r as PDFInput,U as __namedExportsOrder,T as default};
