package com.example.demo.controller;


import com.example.demo.domain.Post;
import com.example.demo.domain.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")


public class UserController {
    @Autowired
    UserService userService;

    @GetMapping//localhost:8080/users
    public List<User> sample() { return userService.findAll();
    }

    @GetMapping("/{id}") //localhost:8080/users/1
    public Optional<User> findById(@PathVariable ("id") long id) {
        return userService.findById(id);
    }

    @PostMapping//localhost:8080/users
    public User create(@RequestBody User user){
        return userService.createPost(user);
    }

    @GetMapping("/{id}/posts") //localhost:8080/users/1/posts
    public List<Post> getById(@PathVariable ("id") long id) {
        return userService.findPostForUser(id);
    }


    // bonus Question

    @GetMapping("/{id}/test") //localhost:8080/users/1/test
    public String getIDAndName (@PathVariable ("id") long id ){
        return userService.getIDAndName(id);
    }

    @GetMapping("/morePosts") // localhost:8080/users/morePosts
    public List<User> findMoreThanOnce (){
        return userService.findMoreThanOnce();
    }

}
