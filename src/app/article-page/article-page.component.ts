import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {FirebaseService} from '../services/firebase';
import {Article, ArticleContent} from "../articles.interfaces";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})

export class ArticlePageComponent implements OnInit {
  articleData: ArticleContent; // base of articles
  pageId = this.route.snapshot.params.id;
  backgroundImageUrl;
  constructor(private route: ActivatedRoute, public service: FirebaseService) {
  }

  ngOnInit() {
    this.service.getArticlesList()
    this.service.listOfArticles.subscribe((articles: Article) => {
      this.articleData = articles.articlesList.filter(article => article.id === this.pageId)[0];
      this.backgroundImageUrl = {
        'background-image': `url(${this?.articleData?.img})`
      };
    })
  }
}
