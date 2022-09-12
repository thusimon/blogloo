import { LOCALE } from "../types";

export interface ArticleInfoType {
  id: string;
  articleListId: string;
  title: string;
  author: string;
  createAt: string;
  locale: string;
}

class ArticleInfo {
  id: string;
  articleListId: string;
  title: string;
  author: string;
  createAt: Date;
  locale: LOCALE;
  constructor(data: ArticleInfoType) {
    this.id = data.id;
    this.articleListId = data.articleListId;
    this.title = data.title;
    this.author = data.author;
    this.createAt = new Date(data.createAt);
    this.locale = LOCALE[data.locale as keyof typeof LOCALE];
  }
}

export default ArticleInfo;
