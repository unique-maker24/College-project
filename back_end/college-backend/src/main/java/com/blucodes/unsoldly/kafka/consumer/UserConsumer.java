package com.blucodes.unsoldly.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class UserConsumer {

	@KafkaListener(topics = "users", groupId = "my-group")
	public void listen(String message) {
		System.out.println("Recieved: " + message);
	}
}
