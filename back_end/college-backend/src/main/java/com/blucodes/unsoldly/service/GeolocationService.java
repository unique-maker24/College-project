package com.blucodes.unsoldly.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.blucodes.unsoldly.entity.Geolocation;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GeolocationService {
	
	@Value("${google.api.key}")
	private String GOOGLE_API_KEY;
	
	public void setGoogleApiKey(String key) {
	    this.GOOGLE_API_KEY = key;
	}

	
	public Geolocation getLatLongFromAddress(String address) throws Exception {
		Geolocation geoLocation= null;
		log.info("Entering into --> getLatLongFromAddress");
		RestTemplate restTemplate =  new RestTemplate();
        String encodedAddress = URLEncoder.encode(address, "UTF-8");
        String requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodedAddress + "&key=" + GOOGLE_API_KEY;
        
        String response = restTemplate.getForObject(requestUrl, String.class);
        JsonObject jsonObject = JsonParser.parseString(response).getAsJsonObject();
        JsonArray results = jsonObject.getAsJsonArray("results");
        if(results.size() >0) {
        	 JsonObject location = results.get(0).getAsJsonObject()
                     .getAsJsonObject("geometry").getAsJsonObject("location");

             String latitude = location.get("lat").getAsString();
             String longitude = location.get("lng").getAsString();
             geoLocation= new Geolocation(Double.valueOf(latitude),Double.valueOf(longitude));
             System.out.println("Latitude: " + latitude + ", Longitude: " + longitude);
             
             
        }
        log.info("Exiting from --> getLatLongFromAddress");
        return geoLocation;
       
    }
}
