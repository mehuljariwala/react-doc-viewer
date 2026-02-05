import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { IMainState } from "../../../store/mainStateReducer";
import {
  PDFActions,
  SET_CURRENT_MAIN_STATE,
  setCurrentPage,
  setPDFPaginated,
} from "./actions";
import {
  initialPDFState,
  IPDFState,
  PDFStateReducer,
  reducer,
} from "./reducer";

const PDFContext = createContext<{
  state: IPDFState;
  dispatch: Dispatch<PDFActions>;
}>({ state: initialPDFState, dispatch: () => null });

const PDFProvider: FC<PropsWithChildren<{ mainState: IMainState }>> = ({
  children,
  mainState,
}) => {
  const [state, dispatch] = useReducer<PDFStateReducer>(reducer, {
    ...initialPDFState,
    defaultZoomLevel:
      mainState.config?.pdfZoom?.defaultZoom ??
      initialPDFState.defaultZoomLevel,
    zoomLevel:
      mainState.config?.pdfZoom?.defaultZoom ?? initialPDFState.zoomLevel,
    zoomJump: mainState.config?.pdfZoom?.zoomJump ?? initialPDFState.zoomJump,
    paginated: mainState.config?.pdfVerticalScrollByDefault
      ? false
      : initialPDFState.paginated,
    mainState,
  });

  const prevTargetPage = useRef<number | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_MAIN_STATE,
      value: mainState,
    });
  }, [mainState]);

  useEffect(() => {
    if (
      mainState.targetPage !== undefined &&
      mainState.targetPage !== prevTargetPage.current &&
      mainState.targetPage >= 1 &&
      mainState.targetPage <= state.numPages
    ) {
      dispatch(setCurrentPage(mainState.targetPage));
      if (!state.paginated) {
        dispatch(setPDFPaginated(true));
      }
      prevTargetPage.current = mainState.targetPage;
    }
  }, [mainState.targetPage, state.numPages, state.paginated]);

  return (
    <PDFContext.Provider value={{ state, dispatch }}>
      {children}
    </PDFContext.Provider>
  );
};

export { PDFContext, PDFProvider };
