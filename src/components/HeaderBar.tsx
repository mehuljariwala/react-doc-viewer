"use client";

import { FC, useContext } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { nextDocument, previousDocument } from "../store/actions";
import { DocumentNav } from "./DocumentNav";
import { FileName } from "./FileName";

export const HeaderBar: FC = () => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { config } = state;

  if (config?.header?.disableHeader) return null;

  const override = config?.header?.overrideComponent?.(
    state,
    () => dispatch(previousDocument()),
    () => dispatch(nextDocument()),
  );

  if (override) {
    return override;
  } else {
    return (
      <div id="header-bar" data-testid="header-bar" className="rdv-header-bar">
        <FileName />
        <DocumentNav />
      </div>
    );
  }
};
