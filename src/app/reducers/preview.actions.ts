import {createAction, props} from "@ngrx/store";
import {ArticleData} from "../main-page/article-prev/article-prev.component";

export namespace PREVIEW_ACTION {
  export const UPLOAD_PREVIEW = createAction('UPLOAD_PREVIEW',
    props<{ previewData: ArticleData }>()
  )
  export const DELETE_PREVIEW = createAction('DELETE_PREVIEW')
  export const CHANGE_THEME = createAction('CHANGE_THEME',
    props<{ theme: string }>())
  export const ADD_TAGS = createAction('CHANGE_THEME',
    props<{ selectedTags: string[] }>())
}

