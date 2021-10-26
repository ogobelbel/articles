import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PreviewState } from './preview';


export namespace previewSelectors {
  export const state = createFeatureSelector<PreviewState>('example');
  export const previewData = createSelector(state, (state) => state.previewData);
  export const selectedTags = createSelector(state, (state) => state.selectedTags)
}
