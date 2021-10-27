import {Component, Input, OnInit} from '@angular/core'
import {ArticleContent} from "../../articles.interfaces";
import {ActivatedRoute, Router} from "@angular/router";

export interface ArticleData {
  title: string;
  contents: string[];
  preview: string;
  tags: string[];
  author: string|null|undefined;
  subTitles: string[];
  img?: string | ArrayBuffer | null | undefined;
  id: string;
}

@Component({
  selector: 'app-article-prev',
  templateUrl: './article-prev.component.html',
  styleUrls: ['./article-prev.component.scss']
})

export class ArticlePrevComponent implements OnInit{
  @Input() articleContent: ArticleContent;
  backgroundImageUrl;
  constructor( public router: Router) {
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.backgroundImageUrl = {
      'background-image': `url(${this?.articleContent?.img})`,
    };
  }
}

