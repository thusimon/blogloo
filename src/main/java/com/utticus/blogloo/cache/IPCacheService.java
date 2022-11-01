package com.utticus.blogloo.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class IPCacheService {
    private static final String CACHE_BUCKET = "Request:IP:Count";

    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    public int addIP(String ip) {
        Integer ipCount = (Integer)redisTemplate.opsForHash().get(CACHE_BUCKET, ip);
        if (ipCount == null) {
            ipCount = 0;
        }
        ipCount++;
        redisTemplate.opsForHash().put(CACHE_BUCKET, ip, ipCount);
        return ipCount.intValue();
    }

    public void clearIP(String ip) {
        redisTemplate.opsForHash().delete(CACHE_BUCKET, ip);
    }

    public void clearIP() {
        redisTemplate.opsForHash().putAll(CACHE_BUCKET, new HashMap<>());
    }

    public int getIP(String ip) {
        Integer ipCount = (Integer)redisTemplate.opsForHash().get(CACHE_BUCKET, ip);
        if (ipCount == null) {
            ipCount = 0;
        }
        return ipCount.intValue();
    }

    public Map<String, Integer> getAllIPVisit() {
        Map<Object, Object> raw = redisTemplate.opsForHash().entries(CACHE_BUCKET);
        Map<String, Integer> result = (Map)raw;
        return result;
    }
}
