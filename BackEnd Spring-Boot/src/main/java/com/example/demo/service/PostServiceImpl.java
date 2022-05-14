package com.example.demo.service;


import com.example.demo.domain.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    PostRepository postRepository;

    @Override
    public List<Post> findAll(){
       return postRepository.findAll();
    }

    @Override
    public Optional<Post> findById(long id){
        return postRepository.findById(id);
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }


    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}
