import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useReducer,
} from "react";
import { IThumbnailConfig } from "../../../models";
import { ThumbnailActions } from "./actions";
import {
  initialThumbnailState,
  IThumbnailState,
  thumbnailReducer,
  ThumbnailStateReducer,
} from "./reducer";

interface ThumbnailContextValue {
  state: IThumbnailState;
  dispatch: Dispatch<ThumbnailActions>;
}

export const ThumbnailContext = createContext<ThumbnailContextValue>({
  state: initialThumbnailState,
  dispatch: () => null,
});

interface ThumbnailProviderProps {
  config?: IThumbnailConfig;
}

export const ThumbnailProvider: FC<PropsWithChildren<ThumbnailProviderProps>> = ({
  children,
  config,
}) => {
  const [state, dispatch] = useReducer<ThumbnailStateReducer>(thumbnailReducer, {
    ...initialThumbnailState,
    isOpen: config?.sidebarDefaultOpen ?? false,
    thumbnailWidth: config?.thumbnailWidth ?? 120,
  });

  return (
    <ThumbnailContext.Provider value={{ state, dispatch }}>
      {children}
    </ThumbnailContext.Provider>
  );
};
