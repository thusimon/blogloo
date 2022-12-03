package com.utticus.blogloo.controller;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.entity.ArticleInfoDTO;
import com.utticus.blogloo.jpa.ArticleRepo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/article")
public class ArticleController {
    private static final Logger logger = LogManager.getLogger(ArticleController.class);
    @Autowired
    ArticleRepo articleRepo;

    @GetMapping(value = "/all")
    @ResponseBody
    public List<ArticleInfoDTO> getAll() {
        return articleRepo.findAllVisibleInfo();
    }

    @Cacheable(value = "article", key = "#id")
    @GetMapping(value = "/full/{id}")
    @ResponseBody
    public Optional<Article> getVisibleById(@PathVariable String id) {
        logger.info("getting article id {} from repo", id);
        return articleRepo.findVisibleFullById(id);
    }

    @Cacheable(value = "article", key = "#id")
    @GetMapping(value = "/full-a/{id}")
    @ResponseBody
    public Optional<Article> getById(@PathVariable String id) {
        logger.info("getting article id {} from repo", id);
        return articleRepo.findById(id);
    }

    @GetMapping(value = "/info/{id}")
    @ResponseBody
    public Optional<ArticleInfoDTO> getInfoById(@PathVariable String id) {
        return articleRepo.findVisibleInfoById(id);
    }

    @GetMapping(value = "/infolist/{listId}")
    @ResponseBody
    public List<ArticleInfoDTO> getVisibleInfoByListId(@PathVariable String listId) {
        return articleRepo.findVisibleInfoByListId(listId);
    }

    @GetMapping(value = "/infolist-a/{listId}")
    @ResponseBody
    public List<ArticleInfoDTO> getInfoByListId(@PathVariable String listId) {
        return articleRepo.findInfoByListId(listId);
    }
}
