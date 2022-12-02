package com.utticus.blogloo.tld;

import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class FilesTag{
    private static final Logger logger = LogManager.getLogger(FilesTag.class);

    private static final String WEBPACK_ASSETS_MANIFEST_PATH = "assets-manifest.json";

    @Autowired
    RedisTemplate<String, Object> redisTemplate;
    public static Map<String, String> getManifestJson(String fileName) {
        try {
            File manifestFile = new File(fileName);
            Reader reader = new FileReader(manifestFile);
            HashMap<String, String> resourceFileMap = new Gson().fromJson(reader, HashMap.class);
            if (resourceFileMap.isEmpty()) {
                logger.error("Error retrieving data in {}", fileName);
            }
            return resourceFileMap;
        } catch (FileNotFoundException e) {
            logger.error("File {} not found", fileName, e);
        } catch (Exception e) {
            logger.error("Error retrieving file {}", fileName, e);
        }
        return Collections.EMPTY_MAP;
    }

    public static String getManifestResource(String resource) {
        try {
            // Load the webpack.manifest.json file from classpath.
            ClassLoader classLoader =  FilesTag.class.getClassLoader();
            File manifestFile = new File(classLoader.getResource(WEBPACK_ASSETS_MANIFEST_PATH).getFile());
            //String cacheKey = createCacheKey(Long.toString(manifestFile.lastModified()), "webpackmanifest");
            Map<String, String> resourceFileMap = Collections.EMPTY_MAP;

            logger.debug("Manifest has not been cached, retrieving JSON data and adding to cache");
            resourceFileMap = getManifestJson(manifestFile.getPath());

            /*
             * Retrieve resourceFileMap values if it has already been cached
             * with the lastModDate as the cache key. If it doesn't exist in the
             * event that manifest has been updated, cache the new manifest with
             * new key/values.
             */
//            if (CustomCache.get(cacheKey) != null) {
//                log.debug("Manifest has already been cached, returning cached value");
//                resourceFileMap = (Map<String, String>) CustomCache.get(cacheKey);
//            } else {
//                log.debug("Manifest has not been cached, retrieving JSON data and adding to cache");
//                resourceFileMap = getManifestJson(manifestFile.getPath());
//                CustomCache.cache(cacheKey, resourceFileMap, TWELVE_HOUR_CACHE_DURATION);
//            }
            return resourceFileMap.get(resource);
        } catch (Exception e) {
            logger.error("Error retrieving asset {} from manifest json resource map", resource, e);
        }
        return "";
    }
}
