package com.example.demo;

import com.example.demo.model.AuthInput;
import com.example.demo.model.User;
import com.example.demo.model.UserData;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ChatController {

    @QueryMapping(name = "getUsers")
    public List<UserData> getUsers()
    {
        return List.of(new UserData("ates"), new UserData("gulay"));
    }
}
