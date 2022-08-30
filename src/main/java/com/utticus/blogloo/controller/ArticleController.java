package com.utticus.blogloo.controller;

import com.utticus.blogloo.entity.Article;
import com.utticus.blogloo.entity.ArticleInfoDTO;
import com.utticus.blogloo.jpa.ArticleRepo;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping(value = "/all", method= RequestMethod.GET)
    @ResponseBody
    public List<ArticleInfoDTO> getAll() {
        return articleRepo.findAllInfo();
    }

    @RequestMapping(value = "/full", method= RequestMethod.GET)
    @ResponseBody
    public Optional<Article> getById(@RequestParam("id") String id) {
        return articleRepo.findById(getUUIDFromBase64Str(id));
    }

    @RequestMapping(value = "/info", method= RequestMethod.GET)
    @ResponseBody
    public Optional<ArticleInfoDTO> getInfoById(@RequestParam("id") String id) {
        return articleRepo.findInfoById(getUUIDFromBase64Str(id));
    }

    @RequestMapping(value = "/full", method= RequestMethod.POST)
    @ResponseBody
    public Article addArticle(@RequestBody Article article) {
        return articleRepo.save(article);
    }
}
