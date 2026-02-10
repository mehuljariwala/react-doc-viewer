import { default as React, Dispatch, RefObject } from '../../node_modules/react';
import { DocViewerRef, IDragDropConfig, IDocument } from '..';
import { DocViewerProps } from '../DocViewer';
import { MainStateActions } from './actions';
import { IMainState } from './mainStateReducer';

export interface DocViewerProviderRef {
    handleFilesDropped: (files: File[]) => Promise<void>;
}
interface ExtendedDocViewerProps extends DocViewerProps {
    dragDropConfig?: IDragDropConfig;
    providerRef?: RefObject<DocViewerProviderRef>;
}
declare const DocViewerContext: React.Context<{
    state: IMainState;
    dispatch: Dispatch<MainStateActions>;
    addDroppedDocuments?: ((documents: IDocument[]) => void) | undefined;
}>;
declare const DocViewerProvider: React.ForwardRefExoticComponent<ExtendedDocViewerProps & {
    children?: React.ReactNode;
} & React.RefAttributes<DocViewerRef>>;
export { DocViewerContext, DocViewerProvider };
