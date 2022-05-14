package com.example.demo.service;


import com.example.demo.domain.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    PostRepository postRepository;

    @Override
    public List<Post> getAll(){
       return postRepository.getAll();
    }

    @Override
    public Post getById(int id){
        return postRepository.getById(id);
    }
    @Override
    public boolean createPost(Long id,String title,String content,String author)
    {
        return postRepository.createPost(id,title,content,author);
    }


    @Override
    public boolean delete(int id)
    {
        return postRepository.delete(id);
    }
}
