package com.blucodes.unsoldly.kafka.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor  // Keep this
public class UserProducerKafka {

    private final KafkaTemplate<String, String> kafkaTemplate;

    // Remove the manual constructor

    public void sendMessage(String topic, String message) {
        kafkaTemplate.send(topic, message);
        System.out.println("Sent : " + message);
    } 
}