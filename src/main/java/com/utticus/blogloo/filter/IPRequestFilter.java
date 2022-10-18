package com.utticus.blogloo.filter;

import org.springframework.web.servlet.HandlerInterceptor;

import com.utticus.blogloo.util.HttpUtil;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class IPRequestFilter implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ipAddress = HttpUtil.getRequestIP(request);
        System.out.println(ipAddress);
        return true;
    }
}
