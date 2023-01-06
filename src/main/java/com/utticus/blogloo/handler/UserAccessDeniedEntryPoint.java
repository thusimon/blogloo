package com.utticus.blogloo.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class UserAccessDeniedEntryPoint implements AuthenticationEntryPoint {
    private static final Logger logger = LogManager.getLogger(UserAccessDeniedEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        logger.warn("User try to access resource {} without permission", request.getRequestURI());
        response.sendRedirect(request.getContextPath() + "/access-denied");
    }
}
