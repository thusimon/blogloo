import { LOCALE } from '../types';

export interface ArticleInfoType {
  id: string
  articleListId: string
  title: string
  author: string
  createAt: string
  locale: string
  visible: boolean
}

export const FAKE_ID = '<ARTICLE_ID>';
export const FAKE_LIST_ID = '<ARTICLE_LIST_ID>';
class ArticleInfo {
  id: string;
  articleListId: string;
  title: string;
  author: string;
  createAt: Date;
  locale: LOCALE;
  visible: boolean;
  constructor (data: ArticleInfoType) {
    this.id = data.id;
    this.articleListId = data.articleListId;
    this.title = data.title;
    this.author = data.author;
    this.createAt = new Date(data.createAt);
    this.locale = LOCALE[data.locale as keyof typeof LOCALE];
    this.visible = data.visible;
  }
}

export default ArticleInfo;
