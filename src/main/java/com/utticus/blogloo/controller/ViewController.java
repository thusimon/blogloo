package com.utticus.blogloo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping(value = {"/", "/index.html", "/view/**", "/view-admin/**"})
    public String home(Model model) {
        return "home";
    }

    @GetMapping(value = {"/access-denied"})
    public String accessDenied(Model model) {
        return "access-denied";
    }
}
