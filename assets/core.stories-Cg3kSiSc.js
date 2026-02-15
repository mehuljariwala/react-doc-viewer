import{j as n,D as d,a as M}from"./DocViewer-B7ekdZ3S.js";import{r as I}from"./index-CDs2tPxN.js";import{p as V}from"./pdf-file-DmCB9yVW.js";import{p as y}from"./pdf-multiple-pages-file-DfCJEmqv.js";import{p as N,w}from"./webp-file-Bt4OxBRh.js";import{c as R}from"./csv-file-DrieSr-z.js";import"./index-BKD8Dact.js";import"./index-BAMY2Nnw.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./iframe-BRyD-XD9.js";import"../sb-preview/runtime.js";import"./tiny-invariant-CopsF_GD.js";const h="data:application/postscript;base64,JSFQUy1BZG9iZS0zLjAgRVBTRi0zLjAKJSVEb2N1bWVudC1Gb250czogVGltZXMtUm9tYW4KJSVUaXRsZTogY2lyY2xlLmVwcwolJUNyZWF0b3I6IFBTX1dyaXRlLkYKJSVDcmVhdGlvbkRhdGU6IDAyLUF1Zy05OQolJVBhZ2VzOiAxCiUlQm91bmRpbmdCb3g6ICAgMzYgICAzNiAgNTc2ICA3NTYKJSVMYW5ndWFnZUxldmVsOiAxCiUlRW5kQ29tbWVudHMKJSVCZWdpblByb2xvZwolJUVuZFByb2xvZwovaW5jaCB7NzIgbXVsfSBkZWYKL1BhbGF0aW5vLVJvbWFuIGZpbmRmb250CjEuMDAgaW5jaCBzY2FsZWZvbnQKc2V0Zm9udAogMC4wMDAwIDAuMDAwMCAwLjAwMDAgc2V0cmdiY29sb3IKJSUgUGFnZTogICAgIDEgICAgMQpzYXZlCiAgNjMgMTUzIG1vdmV0bwogbmV3cGF0aAogIDYzIDE1MyBtb3ZldG8KIDU0OSAxNTMgbGluZXRvCiBzdHJva2UKIG5ld3BhdGgKIDMwNiAzOTYgICA1ICAgMCAzNjAgYXJjCiBjbG9zZXBhdGggc3Ryb2tlCiAwLjAwMDAgMS4wMDAwIDAuMDAwMCBzZXRyZ2Jjb2xvcgogbmV3cGF0aAogMzg3IDQ3NyAgNTQgICAwICA5MCBhcmMKIHN0cm9rZQogMTcxIDI2MSBtb3ZldG8KIDAuMDAwMCAwLjAwMDAgMC4wMDAwIHNldHJnYmNvbG9yCi9QYWxhdGluby1Sb21hbiBmaW5kZm9udAogICAwLjI1MCBpbmNoIHNjYWxlZm9udApzZXRmb250CihUaGlzIGlzICJjaXJjbGUucGxvdCIuKSBzaG93CiAxNzEgMzQyIG1vdmV0bwovUGFsYXRpbm8tUm9tYW4gZmluZGZvbnQKICAgMC4xMjUgaW5jaCBzY2FsZWZvbnQKc2V0Zm9udAooVGhpcyBpcyBzbWFsbCBwcmludC4pIHNob3cKcmVzdG9yZSBzaG93cGFnZQolJVRyYWlsZXIKCg==",Q={title:"DocViewer/Core"},a=[{uri:V},{uri:N},{uri:R},{uri:y},{uri:w}],t=()=>n.jsx(d,{documents:a,initialActiveDocument:a[1],config:{noRenderer:{overrideComponent:({document:e,fileName:o})=>{const r=o||(e==null?void 0:e.fileType)||"";return r?n.jsxs("div",{children:["no renderer for ",r]}):n.jsx("div",{children:"no renderer"})}},loadingRenderer:{overrideComponent:({document:e,fileName:o})=>{const r=o||(e==null?void 0:e.fileType)||"";return r?n.jsxs("div",{children:["loading (",r,")"]}):n.jsx("div",{children:"loading"})}},csvDelimiter:",",pdfZoom:{defaultZoom:1.1,zoomJump:.2},pdfVerticalScrollByDefault:!0},language:"pl"}),i=()=>{const[e,o]=I.useState(a[0]),r=Z=>{o(Z)};return n.jsx(d,{documents:a,activeDocument:e,onDocumentChange:r})},c=()=>{const e=I.useRef(null);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{children:[n.jsx("button",{onClick:()=>{var o;return(o=e==null?void 0:e.current)==null?void 0:o.prev()},children:"Prev Document By Ref"}),n.jsx("button",{onClick:()=>{var o;return(o=e==null?void 0:e.current)==null?void 0:o.next()},children:"Next Document By Ref"})]}),n.jsx(d,{ref:e,documents:a,config:{header:{disableHeader:!0}}})]})},s=()=>{const e=[{uri:h,fileType:"application/postscript"}];return n.jsx(d,{documents:e,initialActiveDocument:e[0],pluginRenderers:M,language:"en"})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"ManualNextPrevNavigation"};c.__docgenInfo={description:"",methods:[],displayName:"WithRef"};s.__docgenInfo={description:"",methods:[],displayName:"NoRenderType"};var l,m,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`() => <DocViewer documents={docs} initialActiveDocument={docs[1]} config={{
  noRenderer: {
    overrideComponent: ({
      document,
      fileName
    }) => {
      const fileText = fileName || document?.fileType || "";
      if (fileText) {
        return <div>no renderer for {fileText}</div>;
      }
      return <div>no renderer</div>;
    }
  },
  loadingRenderer: {
    overrideComponent: ({
      document,
      fileName
    }) => {
      const fileText = fileName || document?.fileType || "";
      if (fileText) {
        return <div>loading ({fileText})</div>;
      }
      return <div>loading</div>;
    }
  },
  csvDelimiter: ",",
  pdfZoom: {
    defaultZoom: 1.1,
    zoomJump: 0.2
  },
  pdfVerticalScrollByDefault: true
}} language="pl" />`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,g,f;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const [activeDocument, setActiveDocument] = useState(docs[0]);
  const handleDocumentChange = (document: IDocument) => {
    setActiveDocument(document);
  };
  return <DocViewer documents={docs} activeDocument={activeDocument} onDocumentChange={handleDocumentChange} />;
}`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var v,D,A;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const docViewerRef = useRef<DocViewerRef>(null);
  return <>
      <div>
        <button onClick={() => docViewerRef?.current?.prev()}>
          Prev Document By Ref
        </button>
        <button onClick={() => docViewerRef?.current?.next()}>
          Next Document By Ref
        </button>
      </div>
      <DocViewer ref={docViewerRef} documents={docs} config={{
      header: {
        disableHeader: true
      }
    }} />
    </>;
}`,...(A=(D=c.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var C,b,x;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const docs = [{
    uri: epsFile,
    fileType: "application/postscript"
  }];
  return <DocViewer documents={docs} initialActiveDocument={docs[0]} pluginRenderers={DocViewerRenderers} language="en" />;
}`,...(x=(b=s.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};const X=["Default","ManualNextPrevNavigation","WithRef","NoRenderType"];export{t as Default,i as ManualNextPrevNavigation,s as NoRenderType,c as WithRef,X as __namedExportsOrder,Q as default};
