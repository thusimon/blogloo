package com.utticus.blogloo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ViewController {
    @RequestMapping(value = {"/", "/index.html", "/view/**", "/view-admin/**"}, method= RequestMethod.GET)
    public String home(Model model) {
        return "home";
    }
}
