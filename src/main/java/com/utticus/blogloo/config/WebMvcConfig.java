package com.utticus.blogloo.config;

import com.utticus.blogloo.filter.IPRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Autowired
    IPRequestFilter ipRequestFilter;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(ipRequestFilter).addPathPatterns("/**");
    }
}
