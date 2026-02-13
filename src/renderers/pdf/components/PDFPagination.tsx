import { FC, useContext, useState, useEffect, useCallback, KeyboardEvent } from "react";
import { PDFContext } from "../state";
import { setCurrentPage } from "../state/actions";
import { NextPDFNavIcon, PrevPDFNavIcon } from "./icons";

const PDFPagination: FC = () => {
  const {
    state: { currentPage, numPages },
    dispatch,
  } = useContext(PDFContext);

  const [inputValue, setInputValue] = useState(String(currentPage));

  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);

  const goToPage = useCallback(
    (val: string) => {
      const page = parseInt(val, 10);
      if (!isNaN(page) && page >= 1 && page <= numPages) {
        dispatch(setCurrentPage(page));
      } else {
        setInputValue(String(currentPage));
      }
    },
    [numPages, currentPage, dispatch],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") goToPage(inputValue);
  };

  return (
    <>
      <button
        id="pdf-pagination-prev"
        className="rdv-toolbar-btn"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
        title="Previous page"
      >
        <PrevPDFNavIcon size="16" />
      </button>

      <div className="rdv-toolbar-page-info">
        <input
          id="pdf-pagination-input"
          className="rdv-toolbar-page-input"
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => goToPage(inputValue)}
          onKeyDown={handleKeyDown}
          onFocus={(e) => e.target.select()}
          aria-label="Go to page"
        />
        <span className="rdv-toolbar-page-total">of {numPages}</span>
      </div>

      <button
        id="pdf-pagination-next"
        className="rdv-toolbar-btn"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= numPages}
        title="Next page"
      >
        <NextPDFNavIcon size="16" />
      </button>
    </>
  );
};

export default PDFPagination;
