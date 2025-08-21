package com.blucodes.unsoldly.kafka.testController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController; 

//import com.blucodes.unsoldly.kafka.producer.UserProducer;
import com.blucodes.unsoldly.kafka.producer.UserProducerKafka;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TestControllerKafka {

	private final UserProducerKafka producer;
	
	@PostMapping("/send")
	public void sendMessage(@RequestParam String msg) {
		producer.sendMessage("users", msg);
	}
	
}
