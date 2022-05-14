package com.example.demo.controller;

import com.example.demo.domain.Post;
import com.example.demo.domain.UserDTO;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/Authenticate")
public class AuthenticateController {


    @PostMapping
    public boolean login(@RequestBody UserDTO user){
        System.out.println(user.getUsername()+user.getPassword());
        if(user.getUsername().equals("test") && user.getPassword().equals("test"))
            return true;

        return false;
    }

}
