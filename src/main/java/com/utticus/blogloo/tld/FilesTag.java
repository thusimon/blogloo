package com.utticus.blogloo.tld;

import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class FilesTag {
    private static final Logger logger = LogManager.getLogger(FilesTag.class);

    private static final String WEBPACK_ASSETS_MANIFEST_PATH = "assets-manifest.json";

    private static Map<String, Map<String, String>> fileResourceCache = new HashMap<>();

    public static Map<String, String> getManifestJson(String fileName) {
        try {
            Map<String, String> manifestMap = fileResourceCache.get(fileName);
            if (manifestMap != null && !manifestMap.isEmpty()) {
                return manifestMap;
            }
            logger.info("manifest file {} has not been cached, retrieving from file and adding to cache", fileName);
            File manifestFile = new File(fileName);
            Reader reader = new FileReader(manifestFile);
            manifestMap = new Gson().fromJson(reader, HashMap.class);
            if (manifestMap.isEmpty()) {
                logger.error("Error retrieving data in {}", fileName);
            }
            fileResourceCache.put(fileName, manifestMap);
            return manifestMap;
        } catch (FileNotFoundException e) {
            logger.error("File {} not found", fileName, e);
        } catch (Exception e) {
            logger.error("Error retrieving file {}", fileName, e);
        }
        return Collections.EMPTY_MAP;
    }

    public static String getManifestResource(String resource) {
        try {
            ClassLoader classLoader =  FilesTag.class.getClassLoader();
            File manifestFile = new File(classLoader.getResource(WEBPACK_ASSETS_MANIFEST_PATH).getFile());
            Map<String, String> resourceFileMap = getManifestJson(manifestFile.getPath());
            return resourceFileMap.get(resource);
        } catch (Exception e) {
            logger.error("Error retrieving asset {} from manifest json resource map", resource, e);
        }
        return "";
    }
}
