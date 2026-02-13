import { useCallback, useContext, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { BookmarksContext } from "../state/context";
import { setOutline, setBookmarksLoading } from "../state/actions";
import { OutlineItem } from "../types";

async function resolvePageIndex(
  dest: pdfjs.PDFDocumentProxy,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any,
): Promise<number> {
  try {
    if (typeof ref === "number") return ref;
    if (Array.isArray(ref) && ref[0]) {
      const idx = await dest.getPageIndex(ref[0]);
      return idx + 1;
    }
    if (typeof ref === "string") {
      const resolvedDest = await dest.getDestination(ref);
      if (resolvedDest && resolvedDest[0]) {
        const idx = await dest.getPageIndex(resolvedDest[0]);
        return idx + 1;
      }
    }
  } catch {
    // ignore
  }
  return 1;
}

async function parseOutline(
  pdf: pdfjs.PDFDocumentProxy,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[],
): Promise<OutlineItem[]> {
  const results: OutlineItem[] = [];
  for (const item of items) {
    const pageIndex = await resolvePageIndex(pdf, item.dest);
    const children = item.items?.length
      ? await parseOutline(pdf, item.items)
      : [];
    results.push({
      title: item.title || "Untitled",
      pageIndex,
      items: children,
    });
  }
  return results;
}

export function useBookmarks(pdfDocument: pdfjs.PDFDocumentProxy | null) {
  const { state, dispatch } = useContext(BookmarksContext);

  useEffect(() => {
    if (!pdfDocument) return;

    let cancelled = false;
    dispatch(setBookmarksLoading(true));

    pdfDocument
      .getOutline()
      .then(async (outline) => {
        if (cancelled) return;
        if (outline && outline.length > 0) {
          const parsed = await parseOutline(pdfDocument, outline);
          if (!cancelled) dispatch(setOutline(parsed));
        } else {
          dispatch(setOutline([]));
        }
      })
      .catch(() => {
        if (!cancelled) dispatch(setOutline([]));
      })
      .finally(() => {
        if (!cancelled) dispatch(setBookmarksLoading(false));
      });

    return () => {
      cancelled = true;
    };
  }, [pdfDocument, dispatch]);

  const navigateToBookmark = useCallback(
    (pageIndex: number) => {
      return pageIndex;
    },
    [],
  );

  return { state, dispatch, navigateToBookmark };
}
