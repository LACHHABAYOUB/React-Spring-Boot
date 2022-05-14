package com.example.demo.controller;


import com.example.demo.domain.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/")
    public List<Post> sample(){
        return postService.getAll();
    }

    @GetMapping("/{id}")
    public Post getById(@PathVariable int id){
        return postService.getById(id);
    }

    @PostMapping("/")
    public boolean create(@RequestParam("id") Long id,@RequestParam("title") String title,@RequestParam("content") String content,@RequestParam("author") String author){
        return postService.createPost(id,title,content,author);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable int id){
        return postService.delete(id);
    }

}
