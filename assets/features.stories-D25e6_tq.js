import{j as e,D as i}from"./DocViewer-B7ekdZ3S.js";import{r as l}from"./index-CDs2tPxN.js";import{p as Ne}from"./pdf-file-DmCB9yVW.js";import{p as o}from"./pdf-multiple-pages-file-DfCJEmqv.js";import{p as Ae,w as Re}from"./webp-file-Bt4OxBRh.js";import{c as ze}from"./csv-file-DrieSr-z.js";import"./index-BKD8Dact.js";import"./index-BAMY2Nnw.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./iframe-BRyD-XD9.js";import"../sb-preview/runtime.js";import"./tiny-invariant-CopsF_GD.js";const I=({left:n,right:t,syncScroll:s=!1})=>{const[r,C]=l.useState(50),T=l.useRef(null),_=l.useRef(!1),M=l.useRef(null),N=l.useRef(null),Le=l.useCallback(()=>{_.current=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none"},[]);return l.useEffect(()=>{const a=c=>{if(!_.current||!T.current)return;const p=T.current.getBoundingClientRect(),B=(c.clientX-p.left)/p.width*100;C(Math.min(80,Math.max(20,B)))},d=()=>{_.current=!1,document.body.style.cursor="",document.body.style.userSelect=""};return document.addEventListener("mousemove",a),document.addEventListener("mouseup",d),()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",d)}},[]),l.useEffect(()=>{var L,A;if(!s)return;const a=(L=M.current)==null?void 0:L.querySelector(".rdv-pdf-main-content"),d=(A=N.current)==null?void 0:A.querySelector(".rdv-pdf-main-content");if(!a||!d)return;let c=!1;const p=()=>{c||(c=!0,d.scrollTop=a.scrollTop,c=!1)},B=()=>{c||(c=!0,a.scrollTop=d.scrollTop,c=!1)};return a.addEventListener("scroll",p),d.addEventListener("scroll",B),()=>{a.removeEventListener("scroll",p),d.removeEventListener("scroll",B)}},[s]),e.jsxs("div",{className:"rdv-split-container",ref:T,children:[e.jsx("div",{className:"rdv-split-panel",style:{width:`${r}%`},ref:M,children:e.jsx(i,{...n})}),e.jsx("div",{className:"rdv-split-divider",onMouseDown:Le,role:"separator","aria-orientation":"vertical"}),e.jsx("div",{className:"rdv-split-panel",style:{width:`${100-r}%`},ref:N,children:e.jsx(i,{...t})})]})};I.__docgenInfo={description:"",methods:[],displayName:"SplitDocViewer",props:{left:{required:!0,tsType:{name:"DocViewerProps"},description:""},right:{required:!0,tsType:{name:"DocViewerProps"},description:""},syncScroll:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Ze={title:"DocViewer/Features"},Ee=[{uri:Ne},{uri:Ae},{uri:ze},{uri:o},{uri:Re}],u=()=>{const[n,t]=l.useState([]);return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"Drag & Drop Demo"})," - Drag PDF or image files onto the viewer below",n.length>0&&e.jsxs("div",{style:{marginTop:"5px",fontSize:"12px"},children:["Dropped: ",n.join(", ")]})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:Ee,config:{dragDrop:{enableDragDrop:!0,acceptedFileTypes:["application/pdf","image/*"],maxFileSize:50*1024*1024,dropBehavior:"append",onDrop:s=>{t(s.map(r=>r.name))},onDropRejected:(s,r)=>{alert(`Files rejected: ${r}`)}}}})})]})},f=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(i,{documents:[{uri:o}],config:{thumbnail:{enableThumbnails:!0,thumbnailWidth:120,sidebarDefaultOpen:!0},pdfVerticalScrollByDefault:!1}})}),g=()=>{const[n,t]=l.useState([]);return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"Annotations Demo"})," - Use the toolbar to highlight, draw, or add comments",e.jsxs("div",{style:{marginTop:"5px",fontSize:"12px"},children:["Annotations count: ",n.length]})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:[{uri:o}],config:{annotations:{enableAnnotations:!0,defaultColor:"#FFFF00",colors:["#FFFF00","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4"],tools:["select","highlight","pen","comment","eraser"],onAnnotationChange:s=>{t(s)}},pdfVerticalScrollByDefault:!1}})})]})},m=()=>{const n=l.useRef(null),[t,s]=l.useState("1");return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0",display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx("strong",{children:"Page Jump Demo"}),e.jsx("input",{type:"number",min:"1",value:t,onChange:r=>s(r.target.value),style:{width:"60px",padding:"5px"}}),e.jsx("button",{onClick:()=>{var C;const r=parseInt(t,10);r>0&&((C=n.current)==null||C.goToPage(r))},style:{padding:"5px 15px"},children:"Go to Page"}),e.jsx("button",{onClick:()=>{var r;return(r=n.current)==null?void 0:r.prev()},style:{padding:"5px 15px"},children:"Prev Doc"}),e.jsx("button",{onClick:()=>{var r;return(r=n.current)==null?void 0:r.next()},style:{padding:"5px 15px"},children:"Next Doc"})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{ref:n,documents:[{uri:o}],config:{pdfVerticalScrollByDefault:!1}})})]})},h=()=>{const[n,t]=l.useState(1);return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0",display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx("strong",{children:"Jump To Page Prop Demo"}),e.jsxs("span",{children:["Current Page: ",n]}),e.jsx("button",{onClick:()=>t(1),style:{padding:"5px 15px"},children:"Page 1"}),e.jsx("button",{onClick:()=>t(3),style:{padding:"5px 15px"},children:"Page 3"}),e.jsx("button",{onClick:()=>t(5),style:{padding:"5px 15px"},children:"Page 5"}),e.jsx("button",{onClick:()=>t(10),style:{padding:"5px 15px"},children:"Page 10"}),e.jsx("input",{type:"number",min:"1",max:"10",value:n,onChange:s=>t(parseInt(s.target.value,10)||1),style:{width:"60px",padding:"5px"}})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:[{uri:o}],jumpToPage:n,config:{pdfVerticalScrollByDefault:!1}})})]})},x=()=>{const[n,t]=l.useState("dark");return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0",display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx("strong",{children:"Dark Mode Demo"}),e.jsx("button",{onClick:()=>t("light"),style:{padding:"4px 12px",fontWeight:n==="light"?"bold":"normal"},children:"Light"}),e.jsx("button",{onClick:()=>t("dark"),style:{padding:"4px 12px",fontWeight:n==="dark"?"bold":"normal"},children:"Dark"}),e.jsx("button",{onClick:()=>t("auto"),style:{padding:"4px 12px",fontWeight:n==="auto"?"bold":"normal"},children:"Auto (System)"}),e.jsxs("span",{style:{fontSize:"12px",color:"#666"},children:["Current: ",n]})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:[{uri:o}],config:{themeMode:n,pdfVerticalScrollByDefault:!1}})})]})},y=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(i,{documents:[{uri:o}],config:{print:{enablePrint:!0},pdfVerticalScrollByDefault:!1}})}),v=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(i,{documents:[{uri:o}],config:{fullscreen:{enableFullscreen:!0},pdfVerticalScrollByDefault:!1}})}),D=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(i,{documents:[{uri:o}],config:{loadingProgress:{enableProgressBar:!0},pdfVerticalScrollByDefault:!1}})}),S=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(i,{documents:[{uri:o}],config:{watermark:{text:"CONFIDENTIAL",opacity:.08,fontSize:52,color:"#ff0000",rotation:-35},pdfVerticalScrollByDefault:!1}})}),b=()=>e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"Text Selection Demo"}),e.jsx("span",{style:{fontSize:"12px",color:"#666",marginLeft:"10px"},children:"Select text on the PDF and copy with Ctrl+C"})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:[{uri:o}],config:{textSelection:{enableTextSelection:!0},pdfVerticalScrollByDefault:!1}})})]}),j=()=>e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"Keyboard Shortcuts Demo"}),e.jsxs("div",{style:{fontSize:"12px",color:"#666",marginTop:"4px",display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsx("span",{children:"Arrow Left/Right: prev/next page"}),e.jsx("span",{children:"Home/End: first/last page"}),e.jsx("span",{children:"+/-: zoom in/out"}),e.jsx("span",{children:"0: reset zoom"}),e.jsx("span",{children:"Esc: exit fullscreen/search"})]})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:[{uri:o}],config:{keyboard:{enableKeyboardShortcuts:!0},fullscreen:{enableFullscreen:!0},search:{enableSearch:!0},print:{enablePrint:!0},pdfVerticalScrollByDefault:!1}})})]}),P=()=>{const[n,t]=l.useState([]);return e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"Password-Protected PDF Demo"}),e.jsx("div",{style:{fontSize:"12px",color:"#666",marginTop:"4px"},children:"Upload a password-protected PDF to test the password prompt"}),e.jsx("input",{type:"file",accept:".pdf",onChange:s=>{var r;return((r=s.target.files)==null?void 0:r.length)&&t(Array.from(s.target.files))},style:{marginTop:"8px"}})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:n.length>0?n.map(s=>({uri:window.URL.createObjectURL(s),fileName:s.name})):[{uri:o}],config:{password:{enablePasswordPrompt:!0},pdfVerticalScrollByDefault:!1}})})]})},k=()=>e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"Text Search Demo"}),e.jsx("span",{style:{fontSize:"12px",color:"#666",marginLeft:"10px"},children:"Click the search icon in the toolbar or press Ctrl+F"})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:[{uri:o}],config:{search:{enableSearch:!0},keyboard:{enableKeyboardShortcuts:!0},textSelection:{enableTextSelection:!0},pdfVerticalScrollByDefault:!1}})})]}),w=()=>e.jsxs("div",{style:{height:"100vh",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px",background:"#f0f0f0"},children:[e.jsx("strong",{children:"Bookmarks / TOC Demo"}),e.jsx("span",{style:{fontSize:"12px",color:"#666",marginLeft:"10px"},children:"Click the bookmark icon in the toolbar to show the table of contents sidebar"})]}),e.jsx("div",{style:{flex:1},children:e.jsx(i,{documents:[{uri:o}],config:{bookmarks:{enableBookmarks:!0},pdfVerticalScrollByDefault:!1}})})]}),F=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(I,{left:{documents:[{uri:o}],config:{pdfVerticalScrollByDefault:!1}},right:{documents:[{uri:Ne}],config:{pdfVerticalScrollByDefault:!1}},syncScroll:!1})}),V=()=>e.jsx("div",{style:{height:"100vh"},children:e.jsx(I,{left:{documents:[{uri:o}],config:{pdfVerticalScrollByDefault:!0}},right:{documents:[{uri:o}],config:{pdfVerticalScrollByDefault:!0}},syncScroll:!0})});u.__docgenInfo={description:"",methods:[],displayName:"DragAndDrop"};f.__docgenInfo={description:"",methods:[],displayName:"ThumbnailSidebar"};g.__docgenInfo={description:"",methods:[],displayName:"Annotations"};m.__docgenInfo={description:"",methods:[],displayName:"PageJump"};h.__docgenInfo={description:"",methods:[],displayName:"JumpToPageProp"};x.__docgenInfo={description:"",methods:[],displayName:"DarkMode"};y.__docgenInfo={description:"",methods:[],displayName:"PrintButton"};v.__docgenInfo={description:"",methods:[],displayName:"Fullscreen"};D.__docgenInfo={description:"",methods:[],displayName:"LoadingProgress"};S.__docgenInfo={description:"",methods:[],displayName:"Watermark"};b.__docgenInfo={description:"",methods:[],displayName:"TextSelection"};j.__docgenInfo={description:"",methods:[],displayName:"KeyboardShortcuts"};P.__docgenInfo={description:"",methods:[],displayName:"PasswordProtection"};k.__docgenInfo={description:"",methods:[],displayName:"TextSearch"};w.__docgenInfo={description:"",methods:[],displayName:"Bookmarks"};F.__docgenInfo={description:"",methods:[],displayName:"SplitView"};V.__docgenInfo={description:"",methods:[],displayName:"SplitViewSyncScroll"};var R,z,E;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [droppedFiles, setDroppedFiles] = useState<string[]>([]);
  return <div style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      padding: "10px",
      background: "#f0f0f0"
    }}>
        <strong>Drag & Drop Demo</strong> - Drag PDF or image files onto the viewer below
        {droppedFiles.length > 0 && <div style={{
        marginTop: "5px",
        fontSize: "12px"
      }}>
            Dropped: {droppedFiles.join(", ")}
          </div>}
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer documents={docs} config={{
        dragDrop: {
          enableDragDrop: true,
          acceptedFileTypes: ["application/pdf", "image/*"],
          maxFileSize: 50 * 1024 * 1024,
          dropBehavior: "append",
          onDrop: files => {
            setDroppedFiles(files.map(f => f.name));
          },
          onDropRejected: (_files, reason) => {
            alert(\`Files rejected: \${reason}\`);
          }
        }
      }} />
      </div>
    </div>;
}`,...(E=(z=u.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var W,J,K;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfMultiplePagesFile
  }]} config={{
    thumbnail: {
      enableThumbnails: true,
      thumbnailWidth: 120,
      sidebarDefaultOpen: true
    },
    pdfVerticalScrollByDefault: false
  }} />
  </div>`,...(K=(J=f.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var O,U,q;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [annotations, setAnnotations] = useState<unknown[]>([]);
  return <div style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }}>
      <div style={{
      padding: "10px",
      background: "#f0f0f0"
    }}>
        <strong>Annotations Demo</strong> - Use the toolbar to highlight, draw, or add comments
        <div style={{
        marginTop: "5px",
        fontSize: "12px"
      }}>
          Annotations count: {annotations.length}
        </div>
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer documents={[{
        uri: pdfMultiplePagesFile
      }]} config={{
        annotations: {
          enableAnnotations: true,
          defaultColor: "#FFFF00",
          colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
          tools: ["select", "highlight", "pen", "comment", "eraser"],
          onAnnotationChange: newAnnotations => {
            setAnnotations(newAnnotations);
          }
        },
        pdfVerticalScrollByDefault: false
      }} />
      </div>
    </div>;
}`,...(q=(U=g.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var $,G,H;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const docViewerRef = useRef<DocViewerRef>(null);
  const [pageInput, setPageInput] = useState("1");
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
      alignItems: "center"
    }}>
        <strong>Page Jump Demo</strong>
        <input type="number" min="1" value={pageInput} onChange={e => setPageInput(e.target.value)} style={{
        width: "60px",
        padding: "5px"
      }} />
        <button onClick={() => {
        const page = parseInt(pageInput, 10);
        if (page > 0) {
          docViewerRef.current?.goToPage(page);
        }
      }} style={{
        padding: "5px 15px"
      }}>
          Go to Page
        </button>
        <button onClick={() => docViewerRef.current?.prev()} style={{
        padding: "5px 15px"
      }}>
          Prev Doc
        </button>
        <button onClick={() => docViewerRef.current?.next()} style={{
        padding: "5px 15px"
      }}>
          Next Doc
        </button>
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer ref={docViewerRef} documents={[{
        uri: pdfMultiplePagesFile
      }]} config={{
        pdfVerticalScrollByDefault: false
      }} />
      </div>
    </div>;
}`,...(H=(G=m.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var X,Q,Y;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [currentPage, setCurrentPage] = useState(1);
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
      alignItems: "center"
    }}>
        <strong>Jump To Page Prop Demo</strong>
        <span>Current Page: {currentPage}</span>
        <button onClick={() => setCurrentPage(1)} style={{
        padding: "5px 15px"
      }}>
          Page 1
        </button>
        <button onClick={() => setCurrentPage(3)} style={{
        padding: "5px 15px"
      }}>
          Page 3
        </button>
        <button onClick={() => setCurrentPage(5)} style={{
        padding: "5px 15px"
      }}>
          Page 5
        </button>
        <button onClick={() => setCurrentPage(10)} style={{
        padding: "5px 15px"
      }}>
          Page 10
        </button>
        <input type="number" min="1" max="10" value={currentPage} onChange={e => setCurrentPage(parseInt(e.target.value, 10) || 1)} style={{
        width: "60px",
        padding: "5px"
      }} />
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer documents={[{
        uri: pdfMultiplePagesFile
      }]} jumpToPage={currentPage} config={{
        pdfVerticalScrollByDefault: false
      }} />
      </div>
    </div>;
}`,...(Y=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var Z,ee,ne;x.parameters={...x.parameters,docs:{...(Z=x.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  const [mode, setMode] = useState<"light" | "dark" | "auto">("dark");
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
      alignItems: "center"
    }}>
        <strong>Dark Mode Demo</strong>
        <button onClick={() => setMode("light")} style={{
        padding: "4px 12px",
        fontWeight: mode === "light" ? "bold" : "normal"
      }}>
          Light
        </button>
        <button onClick={() => setMode("dark")} style={{
        padding: "4px 12px",
        fontWeight: mode === "dark" ? "bold" : "normal"
      }}>
          Dark
        </button>
        <button onClick={() => setMode("auto")} style={{
        padding: "4px 12px",
        fontWeight: mode === "auto" ? "bold" : "normal"
      }}>
          Auto (System)
        </button>
        <span style={{
        fontSize: "12px",
        color: "#666"
      }}>Current: {mode}</span>
      </div>
      <div style={{
      flex: 1
    }}>
        <DocViewer documents={[{
        uri: pdfMultiplePagesFile
      }]} config={{
        themeMode: mode,
        pdfVerticalScrollByDefault: false
      }} />
      </div>
    </div>;
}`,...(ne=(ee=x.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var te,re,oe;y.parameters={...y.parameters,docs:{...(te=y.parameters)==null?void 0:te.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfMultiplePagesFile
  }]} config={{
    print: {
      enablePrint: true
    },
    pdfVerticalScrollByDefault: false
  }} />
  </div>`,...(oe=(re=y.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,ie,le;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfMultiplePagesFile
  }]} config={{
    fullscreen: {
      enableFullscreen: true
    },
    pdfVerticalScrollByDefault: false
  }} />
  </div>`,...(le=(ie=v.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var ae,de,ce;D.parameters={...D.parameters,docs:{...(ae=D.parameters)==null?void 0:ae.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfMultiplePagesFile
  }]} config={{
    loadingProgress: {
      enableProgressBar: true
    },
    pdfVerticalScrollByDefault: false
  }} />
  </div>`,...(ce=(de=D.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var pe,ue,fe;S.parameters={...S.parameters,docs:{...(pe=S.parameters)==null?void 0:pe.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <DocViewer documents={[{
    uri: pdfMultiplePagesFile
  }]} config={{
    watermark: {
      text: "CONFIDENTIAL",
      opacity: 0.08,
      fontSize: 52,
      color: "#ff0000",
      rotation: -35
    },
    pdfVerticalScrollByDefault: false
  }} />
  </div>`,...(fe=(ue=S.parameters)==null?void 0:ue.docs)==null?void 0:fe.source}}};var ge,me,he;b.parameters={...b.parameters,docs:{...(ge=b.parameters)==null?void 0:ge.docs,source:{originalSource:`() => <div style={{
  height: "100vh",
  display: "flex",
  flexDirection: "column"
}}>
    <div style={{
    padding: "10px",
    background: "#f0f0f0"
  }}>
      <strong>Text Selection Demo</strong>
      <span style={{
      fontSize: "12px",
      color: "#666",
      marginLeft: "10px"
    }}>
        Select text on the PDF and copy with Ctrl+C
      </span>
    </div>
    <div style={{
    flex: 1
  }}>
      <DocViewer documents={[{
      uri: pdfMultiplePagesFile
    }]} config={{
      textSelection: {
        enableTextSelection: true
      },
      pdfVerticalScrollByDefault: false
    }} />
    </div>
  </div>`,...(he=(me=b.parameters)==null?void 0:me.docs)==null?void 0:he.source}}};var xe,ye,ve;j.parameters={...j.parameters,docs:{...(xe=j.parameters)==null?void 0:xe.docs,source:{originalSource:`() => <div style={{
  height: "100vh",
  display: "flex",
  flexDirection: "column"
}}>
    <div style={{
    padding: "10px",
    background: "#f0f0f0"
  }}>
      <strong>Keyboard Shortcuts Demo</strong>
      <div style={{
      fontSize: "12px",
      color: "#666",
      marginTop: "4px",
      display: "flex",
      gap: "16px",
      flexWrap: "wrap"
    }}>
        <span>Arrow Left/Right: prev/next page</span>
        <span>Home/End: first/last page</span>
        <span>+/-: zoom in/out</span>
        <span>0: reset zoom</span>
        <span>Esc: exit fullscreen/search</span>
      </div>
    </div>
    <div style={{
    flex: 1
  }}>
      <DocViewer documents={[{
      uri: pdfMultiplePagesFile
    }]} config={{
      keyboard: {
        enableKeyboardShortcuts: true
      },
      fullscreen: {
        enableFullscreen: true
      },
      search: {
        enableSearch: true
      },
      print: {
        enablePrint: true
      },
      pdfVerticalScrollByDefault: false
    }} />
    </div>
  </div>`,...(ve=(ye=j.parameters)==null?void 0:ye.docs)==null?void 0:ve.source}}};var De,Se,be;P.parameters={...P.parameters,docs:{...(De=P.parameters)==null?void 0:De.docs,source:{originalSource:`() => {
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
        <strong>Password-Protected PDF Demo</strong>
        <div style={{
        fontSize: "12px",
        color: "#666",
        marginTop: "4px"
      }}>
          Upload a password-protected PDF to test the password prompt
        </div>
        <input type="file" accept=".pdf" onChange={el => el.target.files?.length && setSelectedDocs(Array.from(el.target.files))} style={{
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
        uri: pdfMultiplePagesFile
      }]} config={{
        password: {
          enablePasswordPrompt: true
        },
        pdfVerticalScrollByDefault: false
      }} />
      </div>
    </div>;
}`,...(be=(Se=P.parameters)==null?void 0:Se.docs)==null?void 0:be.source}}};var je,Pe,ke;k.parameters={...k.parameters,docs:{...(je=k.parameters)==null?void 0:je.docs,source:{originalSource:`() => <div style={{
  height: "100vh",
  display: "flex",
  flexDirection: "column"
}}>
    <div style={{
    padding: "10px",
    background: "#f0f0f0"
  }}>
      <strong>Text Search Demo</strong>
      <span style={{
      fontSize: "12px",
      color: "#666",
      marginLeft: "10px"
    }}>
        Click the search icon in the toolbar or press Ctrl+F
      </span>
    </div>
    <div style={{
    flex: 1
  }}>
      <DocViewer documents={[{
      uri: pdfMultiplePagesFile
    }]} config={{
      search: {
        enableSearch: true
      },
      keyboard: {
        enableKeyboardShortcuts: true
      },
      textSelection: {
        enableTextSelection: true
      },
      pdfVerticalScrollByDefault: false
    }} />
    </div>
  </div>`,...(ke=(Pe=k.parameters)==null?void 0:Pe.docs)==null?void 0:ke.source}}};var we,Fe,Ve;w.parameters={...w.parameters,docs:{...(we=w.parameters)==null?void 0:we.docs,source:{originalSource:`() => <div style={{
  height: "100vh",
  display: "flex",
  flexDirection: "column"
}}>
    <div style={{
    padding: "10px",
    background: "#f0f0f0"
  }}>
      <strong>Bookmarks / TOC Demo</strong>
      <span style={{
      fontSize: "12px",
      color: "#666",
      marginLeft: "10px"
    }}>
        Click the bookmark icon in the toolbar to show the table of contents sidebar
      </span>
    </div>
    <div style={{
    flex: 1
  }}>
      <DocViewer documents={[{
      uri: pdfMultiplePagesFile
    }]} config={{
      bookmarks: {
        enableBookmarks: true
      },
      pdfVerticalScrollByDefault: false
    }} />
    </div>
  </div>`,...(Ve=(Fe=w.parameters)==null?void 0:Fe.docs)==null?void 0:Ve.source}}};var Ce,Be,Te;F.parameters={...F.parameters,docs:{...(Ce=F.parameters)==null?void 0:Ce.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <SplitDocViewer left={{
    documents: [{
      uri: pdfMultiplePagesFile
    }],
    config: {
      pdfVerticalScrollByDefault: false
    }
  }} right={{
    documents: [{
      uri: pdfFile
    }],
    config: {
      pdfVerticalScrollByDefault: false
    }
  }} syncScroll={false} />
  </div>`,...(Te=(Be=F.parameters)==null?void 0:Be.docs)==null?void 0:Te.source}}};var _e,Ie,Me;V.parameters={...V.parameters,docs:{...(_e=V.parameters)==null?void 0:_e.docs,source:{originalSource:`() => <div style={{
  height: "100vh"
}}>
    <SplitDocViewer left={{
    documents: [{
      uri: pdfMultiplePagesFile
    }],
    config: {
      pdfVerticalScrollByDefault: true
    }
  }} right={{
    documents: [{
      uri: pdfMultiplePagesFile
    }],
    config: {
      pdfVerticalScrollByDefault: true
    }
  }} syncScroll={true} />
  </div>`,...(Me=(Ie=V.parameters)==null?void 0:Ie.docs)==null?void 0:Me.source}}};const en=["DragAndDrop","ThumbnailSidebar","Annotations","PageJump","JumpToPageProp","DarkMode","PrintButton","Fullscreen","LoadingProgress","Watermark","TextSelection","KeyboardShortcuts","PasswordProtection","TextSearch","Bookmarks","SplitView","SplitViewSyncScroll"];export{g as Annotations,w as Bookmarks,x as DarkMode,u as DragAndDrop,v as Fullscreen,h as JumpToPageProp,j as KeyboardShortcuts,D as LoadingProgress,m as PageJump,P as PasswordProtection,y as PrintButton,F as SplitView,V as SplitViewSyncScroll,k as TextSearch,b as TextSelection,f as ThumbnailSidebar,S as Watermark,en as __namedExportsOrder,Ze as default};
