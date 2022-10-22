package com.utticus.blogloo.controller;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.entity.ArticleInfoDTO;
import com.utticus.blogloo.jpa.ArticleRepo;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    ArticleRepo articleRepo;

    @GetMapping(value = "/all")
    @ResponseBody
    public List<ArticleInfoDTO> getAll() {
        return articleRepo.findAllVisibleInfo();
    }

    @GetMapping(value = "/full/{id}")
    @ResponseBody
    public Optional<Article> getById(@PathVariable String id) {
        return articleRepo.findFullById(id);
    }

    @GetMapping(value = "/info/{id}")
    @ResponseBody
    public Optional<ArticleInfoDTO> getInfoById(@PathVariable String id) {
        return articleRepo.findInfoById(id);
    }

    @GetMapping(value = "/infolist/{listId}")
    @ResponseBody
    public List<ArticleInfoDTO> getInfoByListId(@PathVariable String listId) {
        return articleRepo.findInfoByListId(listId);
    }
}
