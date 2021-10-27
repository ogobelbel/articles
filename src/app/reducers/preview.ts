import {createAction, createReducer, Action, on} from "@ngrx/store";
import {ArticleData} from "../main-page/article-prev/article-prev.component";
import {PREVIEW_ACTION} from "./preview.actions";

export const upload = createAction('[PREVIEW] upload')

export interface PreviewState {
  previewData: ArticleData;
  selectedTags: string[];
}

export const initialState: PreviewState = {
  previewData: {
    title: '',
    contents: [],
    preview: '',
    tags: [],
    author: '',
    subTitles: [],
    img: '',
    id: '',
  },
  selectedTags: []
}

export const previewReducer = createReducer(
  initialState,
  on(PREVIEW_ACTION.UPLOAD_PREVIEW, (state, {previewData}) => ({
    ...state,
    previewData: previewData
  })),
  on(PREVIEW_ACTION.DELETE_PREVIEW, (state) => ({
    ...state,
    previewData: {
      title: '',
      contents: [],
      preview: '',
      tags: [],
      author: '',
      subTitles: [],
      img: '',
      id: '',
    }
  })),
  on(PREVIEW_ACTION.CHANGE_THEME, (state, {theme}) => ({
    ...state,
    theme: theme
  })),
  on(PREVIEW_ACTION.ADD_TAGS, (state, {selectedTags}) => ({
    ...state,
    selectedTags: selectedTags
  })),
)

export function reducer(state = initialState, action: Action) {
  return previewReducer(state, action)
}

// export function previewReducer(state = initialState, action: UploadPreview){
//   switch(action.type) {
//     case PREVIEW_ACTION.UPLOAD_PREVIEW:
//      return action.payload


//     default:
//       return state;
//   }
// }
