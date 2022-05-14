package com.example.demo.service;


import com.example.demo.domain.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {

    public List<Post> findAll();
    public Optional<Post> findById(long id);
    public Post createPost(Post post);
    public void delete(Long id);

}
