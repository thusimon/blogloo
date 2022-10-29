package com.utticus.blogloo.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class IPCacheService {
    private static final String CACHE_BUCKET = "Request:IP:Count:";

    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    public int addIP(String ip) {
        String key = CACHE_BUCKET.concat(ip);
        Integer ipCount = (Integer)redisTemplate.opsForValue().get(key);
        if (ipCount == null) {
            ipCount = 0;
        }
        ipCount++;
        redisTemplate.opsForValue().set(key, ipCount);
        return ipCount.intValue();
    }

    public void clearIP(String ip) {
        String key = CACHE_BUCKET.concat(ip);
        redisTemplate.opsForValue().set(key, 0);
    }

    public int getIP(String ip) {
        String key = CACHE_BUCKET.concat(ip);
        Integer ipCount = (Integer)redisTemplate.opsForValue().get(key);
        if (ipCount == null) {
            ipCount = 0;
        }
        return ipCount.intValue();
    }
}
