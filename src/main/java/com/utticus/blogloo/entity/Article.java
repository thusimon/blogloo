package com.utticus.blogloo.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
public class Article {
    @Id
    @GeneratedValue(generator = "uuid4")
    @GenericGenerator(name = "UUID", strategy = "uuid4")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(columnDefinition = "BINARY(16)")
    private UUID articleListId;

    private String locale;

    private String title;

    private String author;

    private Date createAt;

    @Column(columnDefinition = "TEXT")
    private String content;

    public Article() {}

    public Article(UUID articleListId, String locale, String title, String author, Date createAt, String content) {
        this.articleListId = articleListId;
        this.locale = locale;
        this.title = title;
        this.author = author;
        this.createAt = createAt;
        this.content = content;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
