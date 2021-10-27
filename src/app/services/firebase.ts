import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {BehaviorSubject} from 'rxjs';
import {ArticleData} from '../main-page/article-prev/article-prev.component';
import {Article, ArticleContent} from "../articles.interfaces";
import {SearchFilterPipe} from "../main-page/search-filter.pipe";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(public fireservices: AngularFirestore,
              public router: Router,
              public searchFilter: SearchFilterPipe) {
  }

  db = this.fireservices.firestore;
  articleInitialValue = {
    id: '',
    subTitles: [''],
    title: '',
    img: '',
    tags: [''],
    author: '',
    preview: '',
    contents: ['']
  };
  listOfArticles = new BehaviorSubject<Article>({isLoading: true, articlesList: [this.articleInitialValue]});
  newBase: ArticleData[] = []; // base for editing
  fireStorage = firebase.storage().ref('Images');

  sendData(data: ArticleData) {
    const image = data.img.toString();
    const base64Image = image.substring((image.indexOf('base64') + 7));
    const randomID = [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
    const thisRef = this.fireStorage.child(`photo-${randomID}`); // add current time to unique name
    thisRef.putString(base64Image, 'base64').then(res => {
        thisRef.getDownloadURL()
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            this.db.collection("articles").add({
              id: `id-${randomID}`,
              img: url,
              title: data.title,
              subTitles: data.subTitles,
              contents: data.contents,
              preview: data.preview,
              tags: data.tags,
              author: data.author
            })
              .then(() => {
                this.router.navigate([`article/id-${randomID}`]) // relocate to new article
              })
            xhr.send();
          })
      }
    )
  }

  getArticlesList() {
    this.fireservices.collection('articles').valueChanges().subscribe((articles: ArticleContent[]) => {
      this.listOfArticles.next({isLoading: false, articlesList: articles});
    })
  }

  filterArticleList(input: string, tags: string[], articles: Article) {
    return {
      isLoading: false,
      articlesList: this.searchFilter.transform(articles.articlesList, tags, input)
    };
  }
}
