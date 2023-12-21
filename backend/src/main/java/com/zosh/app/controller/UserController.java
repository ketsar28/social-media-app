package com.zosh.app.controller;

import com.zosh.app.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping
    public ResponseEntity<?> getUsers() {
        List<User> users = List.of(
                new User("Devi", "single", true, "devi@zosh", "1234567890"),
                new User("Zosh", "single", true, "zosh@zosh", "1234567890")
        );
        return ResponseEntity.ok(users);
    }
}
