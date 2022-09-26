package com.utticus.blogloo.controller;

import com.utticus.blogloo.aop.TrackTime;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
    @TrackTime
    @RequestMapping(value = "/home", method= RequestMethod.GET)
    public String home(Model model) {
        return "home";
    }
}
