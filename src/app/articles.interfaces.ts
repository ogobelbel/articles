export interface ArticleContent {
  id: string;
  author: string;
  contents: string[];
  img: string;
  preview: string;
  subTitles: string[];
  tags: string[];
  title: string;
}

export interface Article {
  isLoading: boolean;
  articlesList: ArticleContent[];
}
