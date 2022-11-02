package com.utticus.blogloo.tasks;

import com.utticus.blogloo.cache.IPCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Service
public class FixedRateTasks {
    @Autowired
    IPCacheService ipCacheService;

    // 00:00 PST every day
    @Scheduled(cron = "${blogloo.cron.daily}", zone = "${blogloo.cron.zone}")
    public void migrateIPToDB() {
        Map<String, Integer> ipCounts = ipCacheService.getAllIPVisit();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");
        Date d = new Date();
        System.out.println(
                "schedule tasks using jobs - " + formatter.format(d)   + ", IP size = " + ipCounts.size());
    }
}
