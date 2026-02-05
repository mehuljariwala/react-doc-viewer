import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";
import { IAnnotationConfig } from "../../../models";
import { AnnotationActions, setAnnotations } from "./actions";
import {
  annotationReducer,
  AnnotationStateReducer,
  DEFAULT_COLORS,
  DEFAULT_TOOLS,
  IAnnotationState,
  initialAnnotationState,
} from "./reducer";

interface AnnotationContextValue {
  state: IAnnotationState;
  dispatch: Dispatch<AnnotationActions>;
  config?: IAnnotationConfig;
}

export const AnnotationContext = createContext<AnnotationContextValue>({
  state: initialAnnotationState,
  dispatch: () => null,
});

interface AnnotationProviderProps {
  config?: IAnnotationConfig;
  documentUri?: string;
}

export const AnnotationProvider: FC<
  PropsWithChildren<AnnotationProviderProps>
> = ({ children, config, documentUri }) => {
  const [state, dispatch] = useReducer<AnnotationStateReducer>(
    annotationReducer,
    {
      ...initialAnnotationState,
      currentColor: config?.defaultColor || initialAnnotationState.currentColor,
      availableColors: config?.colors || DEFAULT_COLORS,
      availableTools: config?.tools || DEFAULT_TOOLS,
      activeTool: config?.tools?.[0] || "select",
      annotations: config?.initialAnnotations || [],
    }
  );

  useEffect(() => {
    if (config?.initialAnnotations) {
      dispatch(setAnnotations(config.initialAnnotations));
    }
  }, [config?.initialAnnotations]);

  useEffect(() => {
    if (config?.onAnnotationChange) {
      config.onAnnotationChange(state.annotations);
    }
  }, [state.annotations, config?.onAnnotationChange]);

  return (
    <AnnotationContext.Provider value={{ state, dispatch, config }}>
      {children}
    </AnnotationContext.Provider>
  );
};
