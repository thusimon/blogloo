package com.utticus.blogloo.filter;

import com.utticus.blogloo.cache.IPCacheService;
import com.utticus.blogloo.util.HttpUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;

@Component
public class IPRequestFilter implements HandlerInterceptor {
    private static final String TRACK_COOKIE_NAME = "X-VISIT";
    private static final String DATE_ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS";
    private static final int TRACK_COOKIE_EXPIRE = 60 * 1;
    @Autowired
    IPCacheService IPCacheService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            cookies = new Cookie[] {};
        }
        String trackCookieValue = Arrays.stream(cookies)
                .filter(c -> StringUtils.equals(c.getName(), TRACK_COOKIE_NAME))
                .findFirst()
                .map(c -> c.getValue())
                .orElse(null);
        if (StringUtils.isNotBlank(trackCookieValue)) {
            // there is still track cookie do not track
            return true;
        }
        // add cookie
        DateFormat dateFormat = new SimpleDateFormat(DATE_ISO_FORMAT);
        dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        Cookie trackCookie = new Cookie(TRACK_COOKIE_NAME, dateFormat.format(new Date()));
        trackCookie.setMaxAge(TRACK_COOKIE_EXPIRE);
        response.addCookie(trackCookie);
        String ipAddress = HttpUtil.getRequestIP(request);
        IPCacheService.addIP(ipAddress);
        int count = IPCacheService.getIP(ipAddress);
        System.out.println(ipAddress + ": " + count);
        return true;
    }
}
