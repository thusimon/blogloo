package com.utticus.blogloo.entity;

import java.util.Date;
import java.util.UUID;

public interface ArticleInfoDTO {
    UUID getId();
    UUID getArticleListId();
    String getLocale();
    String getTitle();
    String getAuthor();
    Date getCreateAt();
}
