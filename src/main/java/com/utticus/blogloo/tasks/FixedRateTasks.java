package com.utticus.blogloo.tasks;

import com.utticus.blogloo.cache.IPCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class FixedRateTasks {
    @Autowired
    IPCacheService ipCacheService;

    @Scheduled(fixedRate = 10000)
    public void migrateIPToDB() {
        Map<String, Integer> ipCounts = ipCacheService.getAllIPVisit();
        long now = System.currentTimeMillis() / 1000;
        System.out.println(
                "schedule tasks using jobs - " + now + ", IP size = " + ipCounts.size());
    }
}
