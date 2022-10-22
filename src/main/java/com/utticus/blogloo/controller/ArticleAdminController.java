package com.utticus.blogloo.controller;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.entity.ArticleInfoDTO;
import com.utticus.blogloo.entity.IDGenerator;
import com.utticus.blogloo.jpa.ArticleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/article")
public class ArticleAdminController {

    @Autowired
    ArticleRepo articleRepo;

    @Autowired
    IDGenerator idGenerator;

    @GetMapping(value = "/all")
    @ResponseBody
    public List<ArticleInfoDTO> getAll() {
        return articleRepo.findAllInfo();
    }
    
    @GetMapping(value = "/full/{id}")
    @ResponseBody
    public Optional<Article> getById(@PathVariable String id) {
        return articleRepo.findById(id);
    }

    @PostMapping(value = "/full")
    @ResponseBody
    public Article addArticle(@RequestBody Article article) {
        if (article.getArticleListId() == null) {
            article.setArticleListId(idGenerator.generate());
        }
        return articleRepo.save(article);
    }

    @PutMapping(value = "/full")
    @ResponseBody
    public Article updateArticle(@RequestBody Article article) {
        String id = article.getId();
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing, can not update");
        }
        Optional<Article> currentArticle = articleRepo.findById(id);
        if (currentArticle.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no such article with ID, can not update");
        }
        return articleRepo.save(article);
    }

    @DeleteMapping(value = "/full/{id}")
    @ResponseBody
    public boolean deleteArticle(@PathVariable String id) {
        articleRepo.deleteById(id);
        return true;
    }
}
