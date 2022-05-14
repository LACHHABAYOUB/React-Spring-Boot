package com.example.demo.repository;


import com.example.demo.domain.Post;

import java.util.List;

public interface PostRepository {

    public List<Post> getAll();
    public Post getById(int id);
    public boolean createPost(Long id,String title,String content,String author);
    public boolean delete(int id);
}
