package com.utticus.blogloo.aop;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.annotation.Configuration;

@Aspect
@Configuration
public class Aspects {
    private static final Logger logger = LogManager.getLogger(Aspects.class);

    @Before("com.utticus.blogloo.aop.PointConfig.controllerLayerExecution()")
    public void controllerBefore(JoinPoint joinPoint) {
        logger.info("Before Controller {}", joinPoint);
    }

    @AfterReturning(
            value = "com.utticus.blogloo.aop.PointConfig.controllerLayerExecution()",
            returning = "result"
    )
    public void controllerAfterReturning(JoinPoint joinPoint, Object result) {
        logger.info("AfterReturning Controller {} with value {}", joinPoint, result);
    }

    @Around("com.utticus.blogloo.aop.PointConfig.trackTimeAnnotation()")
    public Object controllerAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.nanoTime();
        Object result = proceedingJoinPoint.proceed();
        long timeTaken = System.nanoTime() - startTime;
        logger.info("Around Controller {} takes {} ms", proceedingJoinPoint, timeTaken / 1e6);
        return result;
    }
}
