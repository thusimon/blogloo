package com.utticus.blogloo.controller;

import com.utticus.blogloo.model.FileInfo;
import com.utticus.blogloo.service.FilesStorageService;
import com.utticus.blogloo.service.FilesStorageServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            filesStorageService.save(file);
            logger.info("successfully uploaded file {}", file.getOriginalFilename());
            FileInfo fileInfo = new FileInfo(file.getOriginalFilename(), "/upload_files");
            return ResponseEntity.status(HttpStatus.OK).body(fileInfo);
        } catch (Exception e) {
            logger.error("failed to upload file {}", file.getOriginalFilename());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(error);
        }
    }
}
