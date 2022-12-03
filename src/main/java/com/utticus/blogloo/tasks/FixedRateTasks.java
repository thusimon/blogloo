package com.utticus.blogloo.tasks;

import com.utticus.blogloo.cache.IPCacheService;
import com.utticus.blogloo.entity.IpCount;
import com.utticus.blogloo.jpa.IPCountRepo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class FixedRateTasks {
    private static final Logger logger = LogManager.getLogger(FixedRateTasks.class);
    @Autowired
    IPCacheService ipCacheService;

    @Autowired
    IPCountRepo ipCountRepo;

    // 00:00 PST every day
    @Scheduled(cron = "0 0 0 * * *", zone = "${blogloo.cron.zone}")
    public void migrateIPToDB() {
        Map<String, Integer> ipCounts = ipCacheService.getAllIPVisit();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");
        Date date = new Date();
        if (ipCounts.isEmpty()) {
            logger.info("no ip record on {}", formatter.format(date));
            return;
        }
        logger.info("found ip record on {}, will update db", formatter.format(date));
        List<IpCount> ipCountList = ipCounts.entrySet().stream().map(entry -> {
            String ip = entry.getKey();
            int count = entry.getValue();
            return new IpCount(ip, count, date);
        }).toList();
        try {
            ipCountRepo.saveAll(ipCountList);
        } catch (Exception e) {
            logger.error("error occurs when inserting {} records to ip_count table, error: {}", ipCountList.size(), e);
        }
        // clear the cache
        ipCacheService.clearIP();
    }

    @CacheEvict(value = "article", allEntries = true)
    @Scheduled(cron = "0 */30 * * * *", zone = "${blogloo.cron.zone}")
    public void clearArticleCache() {
        logger.info("all articles cache is cleared");
    }
}
