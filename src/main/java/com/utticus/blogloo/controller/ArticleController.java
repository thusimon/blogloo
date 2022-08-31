package com.utticus.blogloo.controller;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.entity.ArticleInfoDTO;
import com.utticus.blogloo.jpa.ArticleRepo;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    ArticleRepo articleRepo;

    private UUID getUUIDFromBase64Str(String base64Id) {
        Base64 base64 = new Base64();
        byte[] bytes = base64.decodeBase64(base64Id);
        ByteBuffer bb = ByteBuffer.wrap(bytes);
        return new UUID(bb.getLong(), bb.getLong());
    }

    @GetMapping(value = "/all")
    @ResponseBody
    public List<ArticleInfoDTO> getAll() {
        return articleRepo.findAllInfo();
    }

    @GetMapping(value = "/full")
    @ResponseBody
    public Optional<Article> getById(@RequestParam("id") String id) {
        return articleRepo.findById(getUUIDFromBase64Str(id));
    }

    @GetMapping(value = "/info")
    @ResponseBody
    public Optional<ArticleInfoDTO> getInfoById(@RequestParam("id") String id) {
        return articleRepo.findInfoById(getUUIDFromBase64Str(id));
    }

    @PostMapping(value = "/full")
    @ResponseBody
    public Article addArticle(@RequestBody Article article) {
        return articleRepo.save(article);
    }

    @PutMapping(value = "/full")
    @ResponseBody
    public Article updateArticle(@RequestBody Article article) {
        UUID id = article.getId();
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID missing, can not update");
        }
        Optional<Article> currentArticle = articleRepo.findById(id);
        if (currentArticle.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no such article with ID, can not update");
        }
        return articleRepo.save(article);
    }

    @DeleteMapping(value = "/full")
    @ResponseBody
    public boolean deleteArticle(@RequestParam("id") String id) {
        articleRepo.deleteById(getUUIDFromBase64Str(id));
        return true;
    }
}
