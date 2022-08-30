package com.utticus.blogloo.entity;

import java.util.Date;

public interface ArticleInfoDTO {
    byte[] getId();
    byte[] getArticleListId();
    String getLocale();
    String getTitle();
    String getAuthor();
    Date getCreateAt();
}
