import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/authentication.service';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators, NgForm, FormControl} from '@angular/forms';
import {FirebaseService} from '../services/firebase';
import {ArticleData} from '../main-page/article-prev/article-prev.component';
import {DataSender} from './dataSender.servise';
import {BooleanInput} from '@angular/cdk/coercion';

export interface HtmlImg extends HTMLElement {
  src: string | ArrayBuffer | null | undefined;
}

import {Store} from '@ngrx/store';
import {PREVIEW_ACTION} from '../reducers/preview.actions';
import {previewSelectors} from '../reducers/preview.selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creating-page',
  templateUrl: './creating-page.component.html',
  styleUrls: ['./creating-page.component.scss']
})


export class CreatingPageComponent implements OnInit {
  constructor(private store: Store,
              public fb: FormBuilder,
              public service: FirebaseService,
              public auth: AuthService,
              public dataSender: DataSender,
              private router: Router) {
    this.auth.userInfo$.subscribe((name) => this.authorName = name?.userName)
    this.dataSender.defaultTags$.subscribe((tags) => this.defaultTags = tags)
    this.store.select(previewSelectors.previewData).subscribe((el) => this.articleData = el)
  }

  sendLoading: boolean = false;
  form!: FormGroup;
  @ViewChild('createPost') createPost!: NgForm;
  authorName: string | null | undefined = '';
  inputFile!: File;
  defaultTags: string[] = [];
  inputImageUrl: string | ArrayBuffer | null | undefined = '';
  status: boolean = false;
  articleData!: ArticleData;
  blocksValue: number[] = [0]
  showPreview: boolean = false;
  @ViewChild('inputFile', {static: false}) fileInput!: ElementRef;

  ngOnInit() {
    this.showPreview = false
    this.inputImageUrl = this.articleData.img
    let subtitle = this.articleData.subTitles;
    let content = this.articleData.contents;
    if (subtitle.length !== 0) {
      this.form = this.fb.group({
        imageInput: [``, []],
        titleInput: [`${this.articleData.title}`, [Validators.required]],
        subTitleInput0: [`${subtitle[0]}`, [Validators.required,
          Validators.maxLength(100)]],
        contentInput0: [`${content[0]}`, [Validators.required]]
      })
    } else {
      this.form = this.fb.group({
        imageInput: [``, []],
        titleInput: [``, [Validators.required]],
        subTitleInput0: [``, [Validators.required,
          Validators.maxLength(100)]],
        contentInput0: [``, [Validators.required]]
      })
    }
    if (subtitle.length > 1 && this.blocksValue.length !== subtitle.length) {
      this.blocksValue = [0]
      for (let i = 0; i < subtitle.length - 1; i++) {
        this.blocksValue.push(i + 1)
        const SubTitileVal = [Validators.required, Validators.max(100)];
        const contentVal = [Validators.required];
        this.form.addControl(`subTitleInput${this.blocksValue.length - 1}`, new FormControl(`${subtitle[i + 1]}`, SubTitileVal));
        this.form.addControl(`contentInput${this.blocksValue.length - 1}`, new FormControl(`${content[i + 1]}`, contentVal));
      }
    }
  }

  getInput(inputName: string, inputNumber: number) {
    return this.form.get(`${inputName}${inputNumber}`)
  }

  addBlock() {
    // this.store.dispatch(PREVIEW_ACTION.UPLOAD_PREVIEW({previewData: this.articleData}))
    const SubTitileVal = [Validators.required, Validators.max(100)];
    const contentVal = [Validators.required];
    this.blocksValue.push(this.blocksValue.length);
    this.form.addControl(`subTitleInput${this.blocksValue.length - 1}`, new FormControl('', SubTitileVal));
    this.form.addControl(`contentInput${this.blocksValue.length - 1}`, new FormControl('', contentVal));
  }

  deleteBlock(blockNumber: number) {
    this.blocksValue.splice(this.blocksValue.indexOf(blockNumber), 1)
    this.form.removeControl(`subTitleInput${blockNumber}`);
    this.form.removeControl(`contentInput${blockNumber}`);
  }

  takeImage(event: Event) {
    let file = ((<HTMLInputElement>event.target).files);
    const reader = new FileReader();

    reader.onloadend = (event) => {
      this.inputImageUrl = event.target?.result;
      console.log(this.inputImageUrl)
    }

    if (file) {
      this.inputFile = file[0];
      reader.readAsDataURL(file[0]);
    }
  }

  deleteImage() {
    this.fileInput.nativeElement.value = "";
    this.inputImageUrl = ''
    this.form.controls.imageInput.reset()
  }

  saveData(isSend: BooleanInput) {
    this.articleData = {
      title: '',
      contents: [],
      preview: '',
      tags: [],
      author: '',
      subTitles: [],
      img: '',
      id: ''
    }

    let dataKeys = Object.keys(this.form.controls);
    let dataValues = Object.values(this.form.controls);
    for (let i = 0; i < dataKeys.length; i++) {

      if (dataKeys[i].includes('titleInput')) {
        this.articleData.title = dataValues[i].value;
      } else if (dataKeys[i].includes('subTitleInput')) {
        this.articleData.subTitles.push(dataValues[i].value);
      } else if (dataKeys[i].includes('contentInput')) {
        this.articleData.contents.push(dataValues[i].value);
      }
    }

    this.articleData.preview = `${this.articleData.subTitles[0].slice(0, 101)}`;
    this.articleData.author = this.authorName;
    this.defaultTags.forEach((el) => {
        this.articleData.tags.push(el)
      }
    )
    this.articleData.img = this.inputImageUrl;
    if (isSend !== false && this.form.valid && this.inputImageUrl && (this.defaultTags.length !== 0)) {
      this.service.sendData(this.articleData);

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
      this.showPreview = true;
    }
    if (isSend === false) {

      this.articleData.img = this.inputImageUrl?.toString()
      this.store.dispatch(PREVIEW_ACTION.UPLOAD_PREVIEW({previewData: this.articleData}))
      this.showPreview = true;
    }
  }

  ngOnDestroy() {
    if (this.router.url !== '/creating/preview') {
      this.store.dispatch(PREVIEW_ACTION.DELETE_PREVIEW())
      this.blocksValue = [0]
      this.dataSender.refresh()
    }

  }
}


