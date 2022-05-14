package com.example.demo.repository;


import com.example.demo.domain.Post;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class PostRepositoryImpl implements PostRepository{

    List<Post> posts = new ArrayList<>(Arrays.asList(new Post(1,"MIU","Its awsome","Tran"),new Post(2,"Mansif","Amazing","Aldini")));

    @Override
    public List<Post> getAll(){
        return posts;
    }

    @Override
    public Post getById(int id ) {
        for (Post po : posts ){
            if(po.getId()== id){
                return po;
            }

        }
        return null;
    }


    @Override
    public boolean createPost(Long id,String title,String content,String author){

        Post pos=new Post(id,title,content,author);
        this.posts.add(pos);
        return true;
    }

    @Override
    public boolean delete(int id)
    {
        int index=0;
        for (Post po : posts) {

            if (po.getId() == id) {
                posts.remove(index);
                return true;
            }
            index++;
        }
        return false;
    }


}
