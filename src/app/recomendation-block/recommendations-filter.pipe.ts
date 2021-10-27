import {Pipe, PipeTransform} from '@angular/core';
import {ArticleContent} from "../articles.interfaces";

@Pipe({
  name: 'recommendationsFilter'
})
export class recommendationsFilterPipe implements PipeTransform {

  transform(articles: ArticleContent[], tags: string[]): ArticleContent[] {
    if (articles.length) {
      return articles.filter((article: ArticleContent) => {
        return article.tags.some(value => {
          return tags.some(value2 => value2 === value)
        })
      });
    }
    return articles;
  }

}
