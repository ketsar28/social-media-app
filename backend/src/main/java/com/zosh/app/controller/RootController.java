package com.zosh.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class RootController {
    @GetMapping
    public String getHello() {
        return "Hello";
    }
}
