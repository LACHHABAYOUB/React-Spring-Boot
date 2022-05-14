package com.example.demo.repository;


import com.example.demo.domain.Post;
import com.example.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository< User , Long> {
    /*
    public Optional<User> findById (long id);
    public User findByName(String name);
    */

    @Query("select u.posts from User u where u.id= :id")
    public List<Post> findPostForUser(@Param("id") long id);

    @Query("select u.id , u.title from User u where u.id= :id")
    public String getIDAndName(@Param("id") long id);

    /* wrong query at my first submission
      @Query("select u.posts from User u where u.posts.size >1")
      public List <Post> findMoreThanOnce();*/

    @Query("select u from User u where u.posts.size >1")
    public List <User> findMoreThanOnce();


}
