package com.example.demo.websocket;

import com.example.demo.model.Message;

import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    MessageRepository messageRepository;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage messageDto) throws IOException {

        Message message = new Message(messageDto);

        //save to db
        messageRepository.save(message);



    }
}
