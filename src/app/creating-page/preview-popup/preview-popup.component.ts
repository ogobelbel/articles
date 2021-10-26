import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ArticleData} from 'src/app/main-page/article-prev/article-prev.component';
import {Store} from '@ngrx/store';
import {previewSelectors} from 'src/app/reducers/preview.selectors';
import {PREVIEW_ACTION} from 'src/app/reducers/preview.actions';
import {FirebaseService} from 'src/app/services/firebase';

@Component({
  selector: 'app-preview-popup',
  templateUrl: './preview-popup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./preview-popup.component.scss']
})
export class PreviewPopupComponent implements OnInit {
  data!: ArticleData;
  sendLoading: boolean = false;

  constructor(private store: Store,
              private service: FirebaseService) {
  }

  ngOnInit(): void {
    this.store.select(previewSelectors.previewData).subscribe((articleData) => this.data = articleData)
    console.log(this.data)
  }

  saveData() {
    this.service.sendData(this.data);
    this.sendLoading = true;
    this.store.dispatch(PREVIEW_ACTION.UPLOAD_PREVIEW({
      previewData: {
        title: '',
        contents: [],
        preview: '',
        tags: [],
        author: '',
        subTitles: [],
        img: '',
        id: ''
      }
    }))
  }
}
