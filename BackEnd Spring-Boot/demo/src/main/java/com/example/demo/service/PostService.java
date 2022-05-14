package com.example.demo.service;


import com.example.demo.domain.Post;

import java.util.List;

public interface PostService {

    public List<Post> getAll();
    public Post getById(int id);
    public boolean createPost(Long id,String title,String content,String author);
    public boolean delete(int id);
}
