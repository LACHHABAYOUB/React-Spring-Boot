package com.example.demo.controller;


import com.example.demo.domain.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000")

public class PostController {
    @Autowired
    PostService postService;

    @GetMapping //localhost:8080/post
    public List<Post> sample() {
        return postService.findAll();
    }

    @GetMapping("/{id}") //localhost:8080/post/1
    public Optional<Post> getById(@PathVariable int id) {
        return postService.findById(id);
    }

    @PostMapping //localhost:8080/post
    public Post create(@RequestBody Post post){
        return postService.createPost(post);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE) // localhost:8080/post/1
    public void delete(@PathVariable Long id){
        postService.delete(id);
    }

}
