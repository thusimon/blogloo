package com.utticus.blogloo.jpa;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.entity.ArticleInfoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ArticleRepo extends JpaRepository<Article, String> {
    @Query(value = "SELECT id, article_list_id as articleListId, locale, title, author, create_at as createAt FROM article where id=?1", nativeQuery = true)
    Optional<ArticleInfoDTO> findInfoById(String uuid);

    @Query(value = "SELECT id, article_list_id as articleListId, locale, title, author, create_at as createAt FROM article", nativeQuery = true)
    List<ArticleInfoDTO> findAllInfo();

    Optional<Article> findById(String id);


}
