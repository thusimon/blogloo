package com.utticus.blogloo.jpa;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.entity.ArticleInfoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ArticleRepo extends JpaRepository<Article, String> {
    @Query(value = "SELECT id, article_list_id as articleListId, locale, title, author, create_at as createAt, visible FROM article where visible=true and id=?1", nativeQuery = true)
    Optional<ArticleInfoDTO> findVisibleInfoById(String uuid);

    @Query(value = "SELECT id, article_list_id as articleListId, locale, title, author, create_at as createAt, visible FROM article where visible=true and article_list_id=?1", nativeQuery = true)
    List<ArticleInfoDTO> findVisibleInfoByListId(String uuid);

    @Query(value = "SELECT id, article_list_id as articleListId, locale, title, author, create_at as createAt, visible FROM article where visible=true", nativeQuery = true)
    List<ArticleInfoDTO> findAllVisibleInfo();

    @Query(value = "SELECT * FROM article where visible=true and id=?1", nativeQuery = true)
    Optional<Article> findVisibleFullById(String id);

    @Query(value = "SELECT id, article_list_id as articleListId, locale, title, author, create_at as createAt, visible FROM article where article_list_id=?1", nativeQuery = true)
    List<ArticleInfoDTO> findInfoByListId(String uuid);
    @Query(value = "SELECT id, article_list_id as articleListId, locale, title, author, create_at as createAt, visible FROM article", nativeQuery = true)
    List<ArticleInfoDTO> findAllInfo();

    Optional<Article> findById(String id);
}
