import { Pipe, PipeTransform } from '@angular/core';
import { ArticleContent} from "../articles.interfaces";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(articles: ArticleContent[], tags: string[], input?: string):  ArticleContent[] {
    return articles.filter((article: ArticleContent) => {
      if(tags.length){
        return article.title.includes(input) && article.tags.some(value => {
          return tags.some(value2=>value2===value)
        })
      }
      return article.title.includes(input);
    });
  }

}
