/* eslint-disable */
import React, { FC, useContext, useEffect, useState, useCallback } from "react";
import { Document } from "react-pdf";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
import { setNumPages, setLoadingProgress, setPasswordRequired, setPasswordCallback, setPDFDocument } from "../../state/actions";
import { initialPDFState } from "../../state/reducer";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";
import { PDFThumbnailGenerator } from "../PDFThumbnailGenerator";
import { PasswordPrompt } from "../../../../features/password-pdf";

const PDFPages: FC<{}> = () => {
  const {
    state: { mainState, paginated, loadingProgress, passwordRequired, passwordCallback },
    dispatch,
  } = useContext(PDFContext);
  const { t } = useTranslation();
  const [passwordError, setPasswordError] = useState(false);

  const currentDocument = mainState?.currentDocument || null;
  const enableProgressBar = mainState?.config?.loadingProgress?.enableProgressBar ?? false;
  const enablePasswordPrompt = mainState?.config?.password?.enablePasswordPrompt ?? false;

  useEffect(() => {
    dispatch(setNumPages(initialPDFState.numPages));
    dispatch(setLoadingProgress(0));
    dispatch(setPasswordRequired(false));
    dispatch(setPasswordCallback(null));
    setPasswordError(false);
  }, [currentDocument]);

  const handleLoadProgress = useCallback(
    ({ loaded, total }: { loaded: number; total: number }) => {
      if (enableProgressBar && total > 0) {
        dispatch(setLoadingProgress(Math.round((loaded / total) * 100)));
      }
    },
    [dispatch, enableProgressBar],
  );

  const handleLoadSuccess = useCallback(
    (pdf: { numPages: number }) => {
      dispatch(setNumPages(pdf.numPages));
      dispatch(setLoadingProgress(100));
      dispatch(setPasswordRequired(false));
      dispatch(setPasswordCallback(null));
      dispatch(setPDFDocument(pdf));
    },
    [dispatch],
  );

  const handlePassword = useCallback(
    (callback: (password: string) => void, reason: number) => {
      if (!enablePasswordPrompt) return;
      if (reason === 2) {
        setPasswordError(true);
      }
      dispatch(setPasswordRequired(true));
      dispatch(setPasswordCallback(callback));
    },
    [dispatch, enablePasswordPrompt],
  );

  const handlePasswordSubmit = useCallback(
    (password: string) => {
      if (passwordCallback) {
        passwordCallback(password);
      }
    },
    [passwordCallback],
  );

  if (!currentDocument || currentDocument.fileData === undefined) return null;

  return (
    <>
      {enableProgressBar && loadingProgress > 0 && loadingProgress < 100 && (
        <div className="rdv-pdf-progress-bar">
          <div
            className="rdv-pdf-progress-fill"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}

      {passwordRequired && enablePasswordPrompt && (
        <PasswordPrompt
          onSubmit={handlePasswordSubmit}
          error={passwordError}
        />
      )}

      <Document
        className="rdv-pdf-document"
        file={currentDocument.fileData}
        onLoadSuccess={handleLoadSuccess}
        onLoadProgress={handleLoadProgress}
        onPassword={enablePasswordPrompt ? handlePassword : undefined}
        loading={<span>{t("pdfPluginLoading")}</span>}
      >
        {paginated ? <PDFSinglePage /> : <PDFAllPages />}
        <PDFThumbnailGenerator />
      </Document>
    </>
  );
};

export default PDFPages;
