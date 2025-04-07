package com.example.demo.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.socket.TextMessage;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@Data
@Document(collection = "messages")
public class Message {
    private String from;
    private String to;
    private String content;
    private Instant timestamp;



    public Message(TextMessage messageDto) {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map;

        try {
            map = mapper.readValue(messageDto.getPayload(), LinkedHashMap.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        if (map != null)
        {
            this.from = map.get("from").toString();
            this.to = map.get("to").toString();
            this.content = map.get("content").toString();
            this.timestamp = Instant.now();
        }
    }
}
