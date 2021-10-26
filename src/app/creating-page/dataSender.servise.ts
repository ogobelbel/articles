import { Injectable} from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';
import { ArticleData } from '../main-page/article-prev/article-prev.component';;


@Injectable({
  providedIn: 'root'
})

export class DataSender {
  constructor(){
    this.articleData$.subscribe((el)=> this.articleData = el)
  }
  public data: string[] = [];
  public defaultTags$ = new BehaviorSubject<string[]>([]);
  public articleData$ = new Subject<ArticleData>();
  public articleData!:ArticleData;
  transferDefaultTag(data: string[]) {
    this.defaultTags$.next(data);
  }
  getData(){
    return this.articleData;
  }
  refresh(){
    this.defaultTags$.next([])
  }
}

