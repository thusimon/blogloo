package com.utticus.blogloo.jpa;

import com.utticus.blogloo.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticleRepo extends JpaRepository<Article, UUID> {
    @Query(value = "SELECT id, article_list_id, locale, title, author, create_at FROM Article where id=?1", nativeQuery = true)
    Optional<Article> findInfoById(UUID uuid);

    @Query(value = "SELECT id, article_list_id, locale, title, author, create_at FROM Article", nativeQuery = true)
    List<Object> findAllInfo();

    Optional<Article> findById(UUID uuid);


}
