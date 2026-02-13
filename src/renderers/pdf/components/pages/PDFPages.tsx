/* eslint-disable */
import React, { FC, useContext, useEffect } from "react";
import { Document } from "react-pdf";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
import { setNumPages } from "../../state/actions";
import { initialPDFState } from "../../state/reducer";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";
import { PDFThumbnailGenerator } from "../PDFThumbnailGenerator";

const PDFPages: FC<{}> = () => {
  const {
    state: { mainState, paginated },
    dispatch,
  } = useContext(PDFContext);
  const { t } = useTranslation();

  const currentDocument = mainState?.currentDocument || null;

  useEffect(() => {
    dispatch(setNumPages(initialPDFState.numPages));
  }, [currentDocument]);

  if (!currentDocument || currentDocument.fileData === undefined) return null;

  return (
    <Document
      className="rdv-pdf-document"
      file={currentDocument.fileData}
      onLoadSuccess={({ numPages }) => dispatch(setNumPages(numPages))}
      loading={<span>{t("pdfPluginLoading")}</span>}
    >
      {paginated ? <PDFSinglePage /> : <PDFAllPages />}
      <PDFThumbnailGenerator />
    </Document>
  );
};

export default PDFPages;
