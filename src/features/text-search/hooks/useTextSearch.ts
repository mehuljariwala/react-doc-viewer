import { useCallback, useContext } from "react";
import { pdfjs } from "react-pdf";
import { SearchContext } from "../state/context";
import {
  setSearchMatches,
  setSearchQuery,
  setIsSearching,
} from "../state/actions";
import { SearchMatch } from "../types";

export function useTextSearch() {
  const { state, dispatch } = useContext(SearchContext);

  const search = useCallback(
    async (query: string, pdfDocument: pdfjs.PDFDocumentProxy | null) => {
      dispatch(setSearchQuery(query));

      if (!query.trim() || !pdfDocument) {
        dispatch(setSearchMatches([]));
        return;
      }

      dispatch(setIsSearching(true));
      const matches: SearchMatch[] = [];
      const lowerQuery = query.toLowerCase();

      try {
        for (let i = 1; i <= pdfDocument.numPages; i++) {
          const page = await pdfDocument.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");

          let startIndex = 0;
          let matchIdx = 0;
          const lowerPageText = pageText.toLowerCase();

          while (true) {
            const foundIndex = lowerPageText.indexOf(lowerQuery, startIndex);
            if (foundIndex === -1) break;
            matches.push({
              pageIndex: i,
              matchIndex: matchIdx++,
              text: pageText.substring(foundIndex, foundIndex + query.length),
            });
            startIndex = foundIndex + 1;
          }
        }
      } catch {
        // PDF may not support text extraction
      }

      dispatch(setSearchMatches(matches));
      dispatch(setIsSearching(false));
    },
    [dispatch],
  );

  return { state, dispatch, search };
}
