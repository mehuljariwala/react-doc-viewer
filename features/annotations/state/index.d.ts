import { default as React, Dispatch, FC, PropsWithChildren } from '../../../../node_modules/react';
import { IAnnotationConfig } from '../../../models';
import { AnnotationActions } from './actions';
import { IAnnotationState } from './reducer';

interface AnnotationContextValue {
    state: IAnnotationState;
    dispatch: Dispatch<AnnotationActions>;
    config?: IAnnotationConfig;
}
export declare const AnnotationContext: React.Context<AnnotationContextValue>;
interface AnnotationProviderProps {
    config?: IAnnotationConfig;
    documentUri?: string;
}
export declare const AnnotationProvider: FC<PropsWithChildren<AnnotationProviderProps>>;
export {};
