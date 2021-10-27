import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from "../services/firebase";
import {Article, ArticleContent} from "../articles.interfaces";
import {SearchFilterPipe} from "../main-page/search-filter.pipe";
import {ActivatedRoute} from "@angular/router";
import {recommendationsFilterPipe} from "./recommendations-filter.pipe";

@Component({
  selector: 'app-recommendation-block',
  templateUrl: './recommendation-block.component.html',
  styleUrls: ['./recommendation-block.component.scss']
})
export class RecommendationBlockComponent implements OnInit {
  @Input() existingTags: string[];
  articlesData: ArticleContent[];
  pageId = this.route.snapshot.params.id;
  constructor(public service: FirebaseService,
              public recommendationsFilter: recommendationsFilterPipe,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getArticlesList()
    this.service.listOfArticles.subscribe((articles: Article) => {
      this.articlesData = this.recommendationsFilter.transform(articles.articlesList, this.existingTags)
        .filter(article => article.id !== this.pageId);
      console.log( this.articlesData, this.existingTags)
    });
  }

}
