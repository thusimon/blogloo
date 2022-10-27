package com.utticus.blogloo.filter;

import com.utticus.blogloo.cache.CacheServiceIP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.utticus.blogloo.util.HttpUtil;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class IPRequestFilter implements HandlerInterceptor {
    @Autowired
    CacheServiceIP cacheServiceIP;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ipAddress = HttpUtil.getRequestIP(request);
        //cacheServiceIP.addIP(ipAddress);
        //int count = cacheServiceIP.getIP(ipAddress);
        int count = 4;
        System.out.println(ipAddress + ": " + count);
        return true;
    }
}
