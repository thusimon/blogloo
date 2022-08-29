package com.utticus.blogloo.controller;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.jpa.ArticleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    ArticleRepo articleRepo;

    @RequestMapping(value = "/all", method= RequestMethod.GET)
    @ResponseBody
    public List<Object> getAll() {
        return articleRepo.findAllInfo();
    }

    @RequestMapping(value = "/full/{id}", method= RequestMethod.GET)
    @ResponseBody
    public Optional<Article> getById(@PathVariable("id") String id) {
        //TODO convert base64 string to uuid
        byte[] bytes = Base64.getDecoder().decode(id);
        String s = new String(bytes);
        UUID uuid = UUID.fromString(s);
        return articleRepo.findById(uuid);
    }

    @RequestMapping(value = "/info/{id}", method= RequestMethod.GET)
    @ResponseBody
    public Optional<Article> getInfoById(@PathVariable("id") String id) {
        byte[] bytes = Base64.getDecoder().decode(id);
        UUID uuid = UUID.nameUUIDFromBytes(bytes);
        return articleRepo.findInfoById(uuid);
    }

    @RequestMapping(value = "/full", method= RequestMethod.POST)
    @ResponseBody
    public Article addArticle(@RequestBody Article article) {
        return articleRepo.save(article);
    }
}
