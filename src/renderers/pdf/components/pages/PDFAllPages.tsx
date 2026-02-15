import React, { FC, useContext, useRef, useEffect, useCallback } from "react";
import { PDFContext } from "../../state";
import PDFSinglePage from "./PDFSinglePage";

export const PDFAllPages: FC = () => {
  const {
    state: { numPages, currentPage },
  } = useContext(PDFContext);

  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setPageRef = useCallback(
    (pageNum: number) => (el: HTMLDivElement | null) => {
      if (el) {
        pageRefs.current.set(pageNum, el);
      } else {
        pageRefs.current.delete(pageNum);
      }
    },
    [],
  );

  useEffect(() => {
    const targetEl = pageRefs.current.get(currentPage);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const PagesArray = [];
  for (let i = 0; i < numPages; i++) {
    PagesArray.push(
      <div key={i + 1} ref={setPageRef(i + 1)}>
        <PDFSinglePage pageNum={i + 1} />
      </div>,
    );
  }

  return <>{PagesArray}</>;
};
