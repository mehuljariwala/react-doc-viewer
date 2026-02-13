import React, { FC, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { useTextSearch } from "../hooks/useTextSearch";
import { nextMatch, prevMatch, setSearchOpen } from "../state/actions";
import { pdfjs } from "react-pdf";
import {
  PrevPDFNavIcon,
  NextPDFNavIcon,
  ClosePDFIcon,
} from "../../../renderers/pdf/components/icons";

interface Props {
  pdfDocument: pdfjs.PDFDocumentProxy | null;
}

export const SearchBar: FC<Props> = ({ pdfDocument }) => {
  const { t } = useTranslation();
  const { state, dispatch, search } = useTextSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.isOpen]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        search(query, pdfDocument);
      }, 300);
    },
    [pdfDocument, search],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          dispatch(prevMatch());
        } else {
          dispatch(nextMatch());
        }
      }
      if (e.key === "Escape") {
        dispatch(setSearchOpen(false));
      }
    },
    [dispatch],
  );

  const handleClose = useCallback(() => {
    dispatch(setSearchOpen(false));
  }, [dispatch]);

  if (!state.isOpen) return null;

  return (
    <div className="rdv-search-bar">
      <input
        ref={inputRef}
        type="text"
        className="rdv-search-input"
        placeholder={t("searchPlaceholder")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span className="rdv-search-count">
        {state.matches.length > 0
          ? t("searchMatchCount", {
              current: state.currentMatchIndex + 1,
              total: state.matches.length,
            })
          : state.query
            ? t("searchNoResults")
            : ""}
      </span>
      <button
        className="rdv-toolbar-btn"
        onMouseDown={() => dispatch(prevMatch())}
        disabled={state.matches.length === 0}
        title="Previous match"
      >
        <PrevPDFNavIcon size="12" />
      </button>
      <button
        className="rdv-toolbar-btn"
        onMouseDown={() => dispatch(nextMatch())}
        disabled={state.matches.length === 0}
        title="Next match"
      >
        <NextPDFNavIcon size="12" />
      </button>
      <button
        className="rdv-toolbar-btn"
        onMouseDown={handleClose}
        title="Close search"
      >
        <ClosePDFIcon size="12" />
      </button>
    </div>
  );
};
