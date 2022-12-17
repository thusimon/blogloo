package com.utticus.blogloo.controller;

import com.utticus.blogloo.service.FilesStorageService;
import com.utticus.blogloo.service.FilesStorageServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {
    private static final Logger logger = LogManager.getLogger(FileController.class);

    @Autowired
    FilesStorageService filesStorageService;

    @GetMapping(value = "/all")
    @ResponseBody
    public List<String> getAllFileUrls() {
        List<String> fileUrls = new ArrayList<>();
        return fileUrls;
    }
}
