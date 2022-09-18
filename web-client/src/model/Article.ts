import { LOCALE } from "../types";

export interface ArticleType {
  id: string;
  articleListId: string;
  title: string;
  author: string;
  createAt: string;
  locale: string;
  content: string;
}

class Article {
  id: string;
  articleListId: string;
  title: string;
  author: string;
  createAt: Date;
  locale: LOCALE;
  content: string;
  constructor(data: ArticleType) {
    this.id = data.id;
    this.articleListId = data.articleListId;
    this.title = data.title;
    this.author = data.author;
    this.createAt = new Date(data.createAt);
    this.locale = LOCALE[data.locale as keyof typeof LOCALE];
    this.content = data.content;
  }
};

export default Article;
