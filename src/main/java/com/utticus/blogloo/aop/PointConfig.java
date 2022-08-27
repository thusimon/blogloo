package com.utticus.blogloo.aop;

import org.aspectj.lang.annotation.Pointcut;

public class PointConfig {
    @Pointcut("execution(* com.utticus.blogloo.controller.*.*(..))")
    public void controllerLayerExecution() {}

    @Pointcut("@annotation(com.utticus.blogloo.aop.TrackTime)")
    public void trackTimeAnnotation() {}
}
