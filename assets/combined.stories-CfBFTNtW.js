import{j as e,D as m}from"./DocViewer-B7ekdZ3S.js";import{r as a}from"./index-CDs2tPxN.js";import{p as h}from"./pdf-multiple-pages-file-DfCJEmqv.js";import"./index-BKD8Dact.js";import"./index-BAMY2Nnw.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./iframe-BRyD-XD9.js";import"../sb-preview/runtime.js";import"./tiny-invariant-CopsF_GD.js";const P={title:"DocViewer/Combined"},n=()=>{const o=a.useRef(null),[r,l]=a.useState("1"),[b,x]=a.useState([]);return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0",display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"},children:[e.jsx("strong",{children:"All Features Demo"}),e.jsx("span",{children:"|"}),e.jsx("input",{type:"number",min:"1",value:r,onChange:s=>l(s.target.value),style:{width:"50px",padding:"4px"},placeholder:"Page"}),e.jsx("button",{onClick:()=>{var i;const s=parseInt(r,10);s>0&&((i=o.current)==null||i.goToPage(s))},style:{padding:"4px 10px"},children:"Jump"}),e.jsx("span",{children:"|"}),e.jsxs("span",{style:{fontSize:"12px"},children:["Annotations: ",b.length]}),e.jsx("span",{children:"|"}),e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"Drag files to add - Click thumbnails to navigate"})]}),e.jsx("div",{style:{flex:1},children:e.jsx(m,{ref:o,documents:[{uri:h}],config:{dragDrop:{enableDragDrop:!0,acceptedFileTypes:["application/pdf","image/*"],dropBehavior:"append"},thumbnail:{enableThumbnails:!0,thumbnailWidth:100,sidebarDefaultOpen:!1},annotations:{enableAnnotations:!0,colors:["#FFFF00","#FF6B6B","#4ECDC4","#45B7D1"],tools:["select","highlight","pen","comment","eraser"],onAnnotationChange:x},pdfVerticalScrollByDefault:!1}})})]})},t=()=>{const o=a.useRef(null),[r,l]=a.useState([]);return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#1f2937",color:"#f9fafb",display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"},children:[e.jsx("strong",{children:"Every Feature Enabled"}),e.jsx("span",{style:{fontSize:"11px",opacity:.7},children:"Dark Mode + Print + Fullscreen + Progress + Watermark + Text Selection + Keyboard + Search + Bookmarks + Thumbnails + Annotations"}),e.jsxs("span",{style:{fontSize:"11px",opacity:.5},children:["Annotations: ",r.length]})]}),e.jsx("div",{style:{flex:1},children:e.jsx(m,{ref:o,documents:[{uri:h}],config:{themeMode:"dark",print:{enablePrint:!0},fullscreen:{enableFullscreen:!0},loadingProgress:{enableProgressBar:!0},watermark:{text:"DRAFT",opacity:.06,fontSize:56,color:"#ffffff",rotation:-30},textSelection:{enableTextSelection:!0},keyboard:{enableKeyboardShortcuts:!0},password:{enablePasswordPrompt:!0},search:{enableSearch:!0},bookmarks:{enableBookmarks:!0},thumbnail:{enableThumbnails:!0,thumbnailWidth:100,sidebarDefaultOpen:!1},annotations:{enableAnnotations:!0,colors:["#FFFF00","#FF6B6B","#4ECDC4","#45B7D1"],tools:["select","highlight","pen","comment","eraser"],onAnnotationChange:l},dragDrop:{enableDragDrop:!0,dropBehavior:"append"},pdfVerticalScrollByDefault:!1}})})]})};n.__docgenInfo={description:"",methods:[],displayName:"AllFeaturesCombined"};t.__docgenInfo={description:"",methods:[],displayName:"EveryFeatureEnabled"};var p,d,c;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const docViewerRef = useRef<DocViewerRef>(null);
  const [pageInput, setPageInput] = useState("1");
  const [annotations, setAnnotations] = useState<unknown[]>([]);
  return <div style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      padding: "10px",
      background: "#f0f0f0",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap"
    }}>
        <strong>All Features Demo</strong>
        <span>|</span>
        <input type="number" min="1" value={pageInput} onChange={e => setPageInput(e.target.value)} style={{
        width: "50px",
        padding: "4px"
      }} placeholder="Page" />
        <button onClick={() => {
        const page = parseInt(pageInput, 10);
        if (page > 0) docViewerRef.current?.goToPage(page);
      }} style={{
        padding: "4px 10px"
      }}>
          Jump
        </button>
        <span>|</span>
        <span style={{
        fontSize: "12px"
      }}>Annotations: {annotations.length}</span>
        <span>|</span>
        <span style={{
        fontSize: "12px",
        color: "#666"
      }}>Drag files to add - Click thumbnails to navigate</span>
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer ref={docViewerRef} documents={[{
        uri: pdfMultiplePagesFile
      }]} config={{
        dragDrop: {
          enableDragDrop: true,
          acceptedFileTypes: ["application/pdf", "image/*"],
          dropBehavior: "append"
        },
        thumbnail: {
          enableThumbnails: true,
          thumbnailWidth: 100,
          sidebarDefaultOpen: false
        },
        annotations: {
          enableAnnotations: true,
          colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1"],
          tools: ["select", "highlight", "pen", "comment", "eraser"],
          onAnnotationChange: setAnnotations
        },
        pdfVerticalScrollByDefault: false
      }} />
      </div>
    </div>;
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,f,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const docViewerRef = useRef<DocViewerRef>(null);
  const [annotations, setAnnotations] = useState<unknown[]>([]);
  return <div style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      padding: "10px",
      background: "#1f2937",
      color: "#f9fafb",
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "wrap"
    }}>
        <strong>Every Feature Enabled</strong>
        <span style={{
        fontSize: "11px",
        opacity: 0.7
      }}>
          Dark Mode + Print + Fullscreen + Progress + Watermark + Text Selection + Keyboard + Search + Bookmarks + Thumbnails + Annotations
        </span>
        <span style={{
        fontSize: "11px",
        opacity: 0.5
      }}>Annotations: {annotations.length}</span>
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer ref={docViewerRef} documents={[{
        uri: pdfMultiplePagesFile
      }]} config={{
        themeMode: "dark",
        print: {
          enablePrint: true
        },
        fullscreen: {
          enableFullscreen: true
        },
        loadingProgress: {
          enableProgressBar: true
        },
        watermark: {
          text: "DRAFT",
          opacity: 0.06,
          fontSize: 56,
          color: "#ffffff",
          rotation: -30
        },
        textSelection: {
          enableTextSelection: true
        },
        keyboard: {
          enableKeyboardShortcuts: true
        },
        password: {
          enablePasswordPrompt: true
        },
        search: {
          enableSearch: true
        },
        bookmarks: {
          enableBookmarks: true
        },
        thumbnail: {
          enableThumbnails: true,
          thumbnailWidth: 100,
          sidebarDefaultOpen: false
        },
        annotations: {
          enableAnnotations: true,
          colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1"],
          tools: ["select", "highlight", "pen", "comment", "eraser"],
          onAnnotationChange: setAnnotations
        },
        dragDrop: {
          enableDragDrop: true,
          dropBehavior: "append"
        },
        pdfVerticalScrollByDefault: false
      }} />
      </div>
    </div>;
}`,...(g=(f=t.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const C=["AllFeaturesCombined","EveryFeatureEnabled"];export{n as AllFeaturesCombined,t as EveryFeatureEnabled,C as __namedExportsOrder,P as default};
