package com.utticus.blogloo.tld;

import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class FilesTag {
    private static final Logger logger = LogManager.getLogger(FilesTag.class);

    private static final String WEBPACK_ASSETS_MANIFEST_FILE = "assets-manifest.json";

    private static Map<String, Map<String, String>> fileResourceCache = new HashMap<>();

    public static Map<String, String> getManifestJson() {
        try {
            Map<String, String> manifestMap = fileResourceCache.get(WEBPACK_ASSETS_MANIFEST_FILE);
            if (manifestMap != null && !manifestMap.isEmpty()) {
                return manifestMap;
            }
            logger.info("manifest file {} has not been cached, retrieving from file and adding to cache", WEBPACK_ASSETS_MANIFEST_FILE);
            ClassPathResource manifestResource = new ClassPathResource(WEBPACK_ASSETS_MANIFEST_FILE, FilesTag.class.getClass().getClassLoader());
            InputStream manifestFileStream = manifestResource.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(manifestFileStream));
            manifestMap = new Gson().fromJson(reader, HashMap.class);
            if (manifestMap.isEmpty()) {
                logger.warn("empty resource data in {}", WEBPACK_ASSETS_MANIFEST_FILE);
            }
            fileResourceCache.put(WEBPACK_ASSETS_MANIFEST_FILE, manifestMap);
            return manifestMap;
        } catch (Exception e) {
            logger.error("Error retrieving file {}", WEBPACK_ASSETS_MANIFEST_FILE, e);
        }
        return Collections.EMPTY_MAP;
    }

    public static String getManifestResource(String resource) {
        try {
            Map<String, String> resourceFileMap = getManifestJson();
            return resourceFileMap.get(resource);
        } catch (Exception e) {
            logger.error("Error retrieving resource {} from manifest json resource map", resource, e);
        }
        return "";
    }
}
