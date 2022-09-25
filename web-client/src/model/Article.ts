import ArticleInfo, { ArticleInfoType } from "./ArticleInfo";

export interface ArticleType extends ArticleInfoType {
  content: string;
}

class Article extends ArticleInfo {
  content: string;
  constructor(data: ArticleType) {
    super(data);
    this.content = data.content;
  }
};

export default Article;
