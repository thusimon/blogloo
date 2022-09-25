package com.utticus.blogloo.entity;

import javax.persistence.Column;
import java.util.Date;
import java.util.UUID;

public class ArticleInfo {
    private UUID id;

    private UUID articleListId;

    private String locale;

    private String title;

    private String author;

    private Date createAt;

    public ArticleInfo() {}

    public ArticleInfo(UUID id, UUID articleListId, String locale, String title, String author, Date createAt) {
        this.id = id;
        this.articleListId = articleListId;
        this.locale = locale;
        this.title = title;
        this.author = author;
        this.createAt = createAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getArticleListId() {
        return articleListId;
    }

    public void setArticleListId(UUID articleListId) {
        this.articleListId = articleListId;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }
}
