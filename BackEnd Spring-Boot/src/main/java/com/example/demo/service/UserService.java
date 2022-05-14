package com.example.demo.service;


import com.example.demo.domain.Post;
import com.example.demo.domain.User;

import java.util.List;
import java.util.Optional;

public interface  UserService {

    public List<User> findAll();
    public Optional<User> findById(long id);
    public User createPost(User user);
    public List<Post> findPostForUser(long id);
    public String getIDAndName(long id);
    public List<User> findMoreThanOnce();

}
