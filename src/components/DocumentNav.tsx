"use client";

import { FC, useContext } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { nextDocument, previousDocument } from "../store/actions";
import { ButtonSecondary } from "./common/Button";
import { NextDocIcon, PrevDocIcon } from "./icons";
import { useTranslation } from "../hooks/useTranslation";

export const DocumentNav: FC = () => {
  const {
    state: { currentDocument, currentFileNo, documents },
    dispatch,
  } = useContext(DocViewerContext);
  const { t } = useTranslation();

  if (documents.length <= 1 || !currentDocument) return null;

  let fileName = currentDocument.uri || "";
  const splitURL = fileName?.split("/");
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1];
  }

  return (
    <div id="doc-nav" className="rdv-doc-nav">
      <p id="doc-nav-info">
        {t("documentNavInfo", {
          currentFileNo: currentFileNo + 1,
          allFilesCount: documents.length,
        })}
      </p>

      <ButtonSecondary
        id="doc-nav-prev"
        className="rdv-doc-nav-btn-prev"
        onClick={() => dispatch(previousDocument())}
        disabled={currentFileNo === 0}
      >
        <PrevDocIcon color="#fff" size="60%" />
      </ButtonSecondary>

      <ButtonSecondary
        id="doc-nav-next"
        className="rdv-doc-nav-btn-next"
        onClick={() => dispatch(nextDocument())}
        disabled={currentFileNo >= documents.length - 1}
      >
        <NextDocIcon color="#fff" size="60%" />
      </ButtonSecondary>
    </div>
  );
};
