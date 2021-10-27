import {Component, OnInit, ViewChild} from '@angular/core';
import firebase from 'firebase'
import {FirebaseService} from '../services/firebase';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Article} from "../articles.interfaces";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  searchDebouncer$: Subject<string> = new Subject();
  searchTagsDebouncer$: Subject<string[]> = new Subject();
  articlesData: Article;
  articlesList: Article;

  constructor(public service: FirebaseService) {
  }

  inputValue: string = '';
  baseOfTags = [];
  activeTags: string[] = [];

  ngOnInit() {
    this.service.getArticlesList()
    this.service.listOfArticles.subscribe((articles: Article) => {
      this.articlesData = this.articlesList = articles;
      articles.articlesList.forEach(value => value.tags.forEach(value1 => value1 !== '' && !this.baseOfTags.some(val => val === value1) ? this.baseOfTags.push(value1) : ''));
    });
    this.searchDebouncer$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.articlesList = this.service.filterArticleList(this.inputValue, this.activeTags, this.articlesData)
    });
    this.searchTagsDebouncer$.pipe(
    ).subscribe(() => {
      this.articlesList = this.service.filterArticleList(this.inputValue, this.activeTags, this.articlesData)
    });
  }

  collectTag(tag: string) {
    if (this.activeTags.indexOf(tag) !== -1) {
      this.activeTags.splice(this.activeTags.indexOf(tag), 1);
    } else {
      this.activeTags.push(tag);
    }
    this.searchTagsDebouncer$.next(this.activeTags)
  }

  isActiveTag(item: string) {
    return this.activeTags.indexOf(item) !== -1;
  }

  search() {
    this.searchDebouncer$.next(this.inputValue);
  }
}
