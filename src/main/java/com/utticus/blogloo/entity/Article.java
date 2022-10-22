package com.utticus.blogloo.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Article {
    @Id
    @GeneratedValue(generator = "id-generator")
    @GenericGenerator(name = "id-generator", strategy = "com.utticus.blogloo.entity.IDGenerator")
    private String id;

    private String articleListId;

    private String locale;

    private String title;

    private String author;

    private Date createAt;

    private boolean visible;

    @Column(columnDefinition = "TEXT")
    private String content;

    public Article() {}

    public Article(String articleListId, String locale, String title, String author, Date createAt, boolean visible, String content) {
        this.articleListId = articleListId;
        this.locale = locale;
        this.title = title;
        this.author = author;
        this.createAt = createAt;
        this.visible = visible;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getArticleListId() {
        return articleListId;
    }

    public void setArticleListId(String articleListId) {
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

    public boolean getVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
