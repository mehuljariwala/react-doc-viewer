import{j as e,D as r,a as i}from"./DocViewer-DJKOXO6p.js";import{p as se}from"./pdf-file-DmCB9yVW.js";import{p as oe}from"./pdf-multiple-pages-file-DfCJEmqv.js";import{d as te,t as ce,m as ae,r as le}from"./rtf-file-CE_FO-hL.js";import"./index-CDs2tPxN.js";import"./iframe-COEPnoBp.js";import"../sb-preview/runtime.js";import"./index-BKD8Dact.js";import"./index-BAMY2Nnw.js";import"./index-eWB9ySsw.js";import"./tiny-invariant-CopsF_GD.js";const de=""+new URL("docx-single-page-zw5thNAE.docx",import.meta.url).href,pe=""+new URL("docx-multiple-pages-C0M4U43-.docx",import.meta.url).href,me=""+new URL("lost-wage-verification-ByOdpbEp.docx",import.meta.url).href,Se={title:"DocViewer/File Types/Documents"},s=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:se,fileName:"single-page.pdf"}],pluginRenderers:i,config:{pdfVerticalScrollByDefault:!0}})}),t=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:oe,fileName:"multi-page.pdf"}],pluginRenderers:i,config:{pdfVerticalScrollByDefault:!0}})}),c=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:te,fileName:"sample.docx",fileType:"docx"}],pluginRenderers:i})}),a=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:de,fileName:"single-page.docx",fileType:"docx"}],pluginRenderers:i})}),l=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:pe,fileName:"multi-page.docx",fileType:"docx"}],pluginRenderers:i})}),d=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:me,fileName:"17_Lost_Wage_Verification.docx",fileType:"docx"}],pluginRenderers:i})}),p=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:ce,fileName:"sample.txt",fileType:"text/plain"}],pluginRenderers:i})}),m=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:ae,fileName:"README.md",fileType:"text/markdown"}],pluginRenderers:i})}),u=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:"https://filesamples.com/samples/document/docx/sample3.docx",fileName:"sample-document.docx",fileType:"docx"}],pluginRenderers:i,config:{docx:{useOfficeOnlineViewer:!0}}})}),g=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:le,fileName:"sample.rtf",fileType:"application/rtf"}],pluginRenderers:i})}),f=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:oe,fileName:"multi-page.pdf"}],pluginRenderers:i,config:{pdfVerticalScrollByDefault:!0,selectionToolbar:{actions:[{label:"Explain",onClick:(o,n)=>console.log("Explain:",{text:o,page:n})},{label:"Summarize",onClick:(o,n)=>console.log("Summarize:",{text:o,page:n})},{label:"Rewrite",onClick:(o,n)=>console.log("Rewrite:",{text:o,page:n})}]}}})}),ne={serverConversion:{serviceUrl:"http://localhost:3000/forms/libreoffice/convert",onConversionStart:o=>console.log("Conversion started:",o.fileName),onConversionComplete:o=>console.log("Conversion complete:",o.fileName),onConversionError:(o,n)=>console.error("Conversion failed:",o.fileName,n)}},h=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:pfWithdrawalForm,fileName:"Form 19 - PF withdrawal Application.docx",fileType:"docx"}],pluginRenderers:i,config:ne})}),x=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(r,{documents:[{uri:emsAmbulanceReport,fileName:"03_EMS_Ambulance_Run_Report.docx",fileType:"docx"}],pluginRenderers:i,config:ne})});s.__docgenInfo={description:"",methods:[],displayName:"PDFSinglePage"};t.__docgenInfo={description:"",methods:[],displayName:"PDFMultiPage"};c.__docgenInfo={description:"",methods:[],displayName:"DOCX"};a.__docgenInfo={description:"",methods:[],displayName:"DOCXSinglePage"};l.__docgenInfo={description:"",methods:[],displayName:"DOCXMultiPage"};d.__docgenInfo={description:"",methods:[],displayName:"DOCXLostWageVerification"};p.__docgenInfo={description:"",methods:[],displayName:"TXT"};m.__docgenInfo={description:"",methods:[],displayName:"Markdown"};u.__docgenInfo={description:"",methods:[],displayName:"DOCXMicrosoftViewer"};g.__docgenInfo={description:"",methods:[],displayName:"RTF"};f.__docgenInfo={description:"",methods:[],displayName:"PDFWithSelectionToolbar"};h.__docgenInfo={description:"",methods:[],displayName:"DOCXServerConversion"};x.__docgenInfo={description:"",methods:[],displayName:"DOCXEMSAmbulanceReportServerConversion"};var v,D,y;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfFile,
    fileName: "single-page.pdf"
  }]} pluginRenderers={DocViewerRenderers} config={{
    pdfVerticalScrollByDefault: true
  }} />
  </div>`,...(y=(D=s.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};var R,w,C;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfMultiplePagesFile,
    fileName: "multi-page.pdf"
  }]} pluginRenderers={DocViewerRenderers} config={{
    pdfVerticalScrollByDefault: true
  }} />
  </div>`,...(C=(w=t.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var S,V,N;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: docxFile,
    fileName: "sample.docx",
    fileType: "docx"
  }]} pluginRenderers={DocViewerRenderers} />
  </div>`,...(N=(V=c.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};var _,T,F;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: docxSinglePage,
    fileName: "single-page.docx",
    fileType: "docx"
  }]} pluginRenderers={DocViewerRenderers} />
  </div>`,...(F=(T=a.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var P,j,O;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: docxMultiplePages,
    fileName: "multi-page.docx",
    fileType: "docx"
  }]} pluginRenderers={DocViewerRenderers} />
  </div>`,...(O=(j=l.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var M,X,b;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: lostWageDocx,
    fileName: "17_Lost_Wage_Verification.docx",
    fileType: "docx"
  }]} pluginRenderers={DocViewerRenderers} />
  </div>`,...(b=(X=d.parameters)==null?void 0:X.docs)==null?void 0:b.source}}};var E,I,A;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: txtFile,
    fileName: "sample.txt",
    fileType: "text/plain"
  }]} pluginRenderers={DocViewerRenderers} />
  </div>`,...(A=(I=p.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var W,k,L;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: mdFile,
    fileName: "README.md",
    fileType: "text/markdown"
  }]} pluginRenderers={DocViewerRenderers} />
  </div>`,...(L=(k=m.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var B,z,U;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: "https://filesamples.com/samples/document/docx/sample3.docx",
    fileName: "sample-document.docx",
    fileType: "docx"
  }]} pluginRenderers={DocViewerRenderers} config={{
    docx: {
      useOfficeOnlineViewer: true
    }
  }} />
  </div>`,...(U=(z=u.parameters)==null?void 0:z.docs)==null?void 0:U.source}}};var q,G,H;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: rtfFile,
    fileName: "sample.rtf",
    fileType: "application/rtf"
  }]} pluginRenderers={DocViewerRenderers} />
  </div>`,...(H=(G=g.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,K,Q;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfMultiplePagesFile,
    fileName: "multi-page.pdf"
  }]} pluginRenderers={DocViewerRenderers} config={{
    pdfVerticalScrollByDefault: true,
    selectionToolbar: {
      actions: [{
        label: "Explain",
        onClick: (text: string, page: number) => console.log("Explain:", {
          text,
          page
        })
      }, {
        label: "Summarize",
        onClick: (text: string, page: number) => console.log("Summarize:", {
          text,
          page
        })
      }, {
        label: "Rewrite",
        onClick: (text: string, page: number) => console.log("Rewrite:", {
          text,
          page
        })
      }]
    }
  }} />
  </div>`,...(Q=(K=f.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var Y,Z,$;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pfWithdrawalForm,
    fileName: "Form 19 - PF withdrawal Application.docx",
    fileType: "docx"
  }]} pluginRenderers={DocViewerRenderers} config={serverConversionConfig} />
  </div>`,...($=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ie;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: emsAmbulanceReport,
    fileName: "03_EMS_Ambulance_Run_Report.docx",
    fileType: "docx"
  }]} pluginRenderers={DocViewerRenderers} config={serverConversionConfig} />
  </div>`,...(ie=(re=x.parameters)==null?void 0:re.docs)==null?void 0:ie.source}}};const Ve=["PDFSinglePage","PDFMultiPage","DOCX","DOCXSinglePage","DOCXMultiPage","DOCXLostWageVerification","TXT","Markdown","DOCXMicrosoftViewer","RTF","PDFWithSelectionToolbar","DOCXServerConversion","DOCXEMSAmbulanceReportServerConversion"];export{c as DOCX,x as DOCXEMSAmbulanceReportServerConversion,d as DOCXLostWageVerification,u as DOCXMicrosoftViewer,l as DOCXMultiPage,h as DOCXServerConversion,a as DOCXSinglePage,m as Markdown,t as PDFMultiPage,s as PDFSinglePage,f as PDFWithSelectionToolbar,g as RTF,p as TXT,Ve as __namedExportsOrder,Se as default};
