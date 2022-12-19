package com.utticus.blogloo.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
    private static final Logger logger = LogManager.getLogger(StaticResourceConfig.class);
    @Value("${blogloo.files.public.path}")
    private String filesPublicPath;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path root = Paths.get(filesPublicPath);

        try {
            Resource resource = new UrlResource(root.toUri());
            String uploadFilePath = resource.getURL().toString();
            registry.addResourceHandler("/file_uploads/public/**").addResourceLocations(uploadFilePath);
        } catch (IOException e) {
            logger.error("failed to register public uploaded file path to resource");
        }

    }
}
