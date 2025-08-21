package com.blucodes.unsoldly;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class GeocodingExample {
    private static final String API_KEY = "AIzaSyDkCqqaNBVcoTkrA2Ov5BRldugCgri89lo";

    public static void main(String[] args) {
        String address = "123";
        try {
            String latitudeLongitude = getLatLongFromAddress(address);
            System.out.println(latitudeLongitude);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String getLatLongFromAddress(String address) throws Exception {
        String encodedAddress = URLEncoder.encode(address, "UTF-8");
        String requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodedAddress + "&key=" + API_KEY;

        URL url = new URL(requestUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        JsonObject jsonObject = JsonParser.parseString(response.toString()).getAsJsonObject();
        JsonArray results = jsonObject.getAsJsonArray("results");
        System.out.println(" response  ================= "+response.toString());
        
        if (results.size() == 0) {
            return "No results found for the given address.";
        }

        JsonObject location = results.get(0).getAsJsonObject()
                .getAsJsonObject("geometry").getAsJsonObject("location");

        String latitude = location.get("lat").getAsString();
        String longitude = location.get("lng").getAsString();

        return "Latitude: " + latitude + ", Longitude: " + longitude;
    }
}
