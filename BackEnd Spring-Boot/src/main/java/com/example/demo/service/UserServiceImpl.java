package com.example.demo.service;


import com.example.demo.domain.Post;
import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository UserRepository;

    @Override
    public List<User> findAll(){ return UserRepository.findAll();}

    @Override
    public Optional<User> findById(long id){
        return UserRepository.findById(id);
    }

    @Override
    public User createPost(User User) { return UserRepository.save(User); }

    @Override
    public List<Post> findPostForUser(@Param("id") long id){
        return UserRepository.findPostForUser(id);
    }

    @Override
    public String getIDAndName(@Param("id") long id) {
        return UserRepository.getIDAndName(id);
    }

    @Override
    public List<User> findMoreThanOnce() {
        return UserRepository.findMoreThanOnce();
    }


}
