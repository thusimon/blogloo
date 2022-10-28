package com.utticus.blogloo.filter;

import com.utticus.blogloo.cache.IPCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.utticus.blogloo.util.HttpUtil;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class IPRequestFilter implements HandlerInterceptor {
    @Autowired
    IPCacheService IPCacheService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ipAddress = HttpUtil.getRequestIP(request);
        IPCacheService.addIP(ipAddress);
        int count = IPCacheService.getIP(ipAddress);
        System.out.println(ipAddress + ": " + count);
        return true;
    }
}
