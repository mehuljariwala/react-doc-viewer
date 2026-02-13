import { FC, useContext } from "react";
import { Button } from "../../../components/common";
import { PDFContext } from "../state";
import { setCurrentPage } from "../state/actions";
import { NextPDFNavIcon, PrevPDFNavIcon } from "./icons";
import { useTranslation } from "../../../hooks/useTranslation";

const PDFPagination: FC = () => {
  const {
    state: { currentPage, numPages },
    dispatch,
  } = useContext(PDFContext);
  const { t } = useTranslation();

  return (
    <div id="pdf-pagination" className="rdv-pdf-pagination">
      <Button
        id="pdf-pagination-prev"
        className="rdv-pdf-page-nav-btn-left"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <PrevPDFNavIcon color="#000" size="15" />
      </Button>

      <div id="pdf-pagination-info" className="rdv-pdf-page-tag">
        {t("pdfPluginPageNumber", {
          currentPage,
          allPagesCount: numPages,
        })}
      </div>

      <Button
        id="pdf-pagination-next"
        className="rdv-pdf-page-nav-btn-right"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= numPages}
      >
        <NextPDFNavIcon color="#000" size="15" />
      </Button>
    </div>
  );
};

export default PDFPagination;
