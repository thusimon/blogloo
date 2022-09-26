package com.utticus.blogloo.entity;

import java.util.Date;

public interface ArticleInfoDTO {
    String getId();
    String getArticleListId();
    String getLocale();
    String getTitle();
    String getAuthor();
    Date getCreateAt();
}
