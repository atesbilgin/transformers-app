package com.example.demo;


import com.example.demo.jwt.JwtUtil;
import com.example.demo.model.AuthInput;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @MutationMapping(name = "signup")
    public AuthPayload signup(@Argument(name = "authData") AuthInput userDto)
    {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        //save user
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId());
        return new AuthPayload(token);
    }

    @MutationMapping(name = "login")
    public AuthPayload login(@Argument(name = "authData") AuthInput userDto)
    {
        Optional<User> userOpt = userRepository.findByEmail(userDto.getEmail());
        if (userOpt.isEmpty() || !passwordEncoder.matches(userDto.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(userOpt.get().getId());
        return new AuthPayload(token);
    }

}
