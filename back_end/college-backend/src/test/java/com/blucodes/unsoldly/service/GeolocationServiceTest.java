//package com.blucodes.unsoldly.service;
//
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.ArgumentMatchers.eq;
//import static org.mockito.Mockito.when;
//import static org.junit.jupiter.api.Assertions.*;
//
//import com.blucodes.unsoldly.entity.Geolocation;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.web.client.RestTemplate;
//
//public class GeolocationServiceTest {
//
//	
//
//    @Mock
//    private RestTemplate restTemplate;
//
//    @InjectMocks
//    private GeolocationService geolocationService;
//
//    @BeforeEach
//    public void setup() {
//        MockitoAnnotations.openMocks(this);
//        geolocationService.setGoogleApiKey("***dummy-key***");  // Use setter or make field protected
//    }
//
//    @Test
//    public void testGetLatLongFromAddress_Success() throws Exception {
//        String mockResponse = """
//            {
//                "results": [{
//                    "geometry": {
//                        "location": {
//                            "lat": 12.3456,
//                            "lng": 65.4321
//                        }
//                    }
//                }],
//                "status": "OK"
//            }
//            """;
//
//        when(restTemplate.getForObject(anyString(), eq(String.class))).thenReturn(mockResponse);
//
//        Geolocation geo = geolocationService.getLatLongFromAddress("some address");
//
//        assertNotNull(geo);
//        assertEquals(12.3456, geo.getLatitude());
//        assertEquals(65.4321, geo.getLongitude());
//    }
//
//    @Test
//    public void testGetLatLongFromAddress_NoResults() throws Exception {
//        String mockResponse = """
//            {
//                "results": [],
//                "status": "ZERO_RESULTS"
//            }
//            """;
//
//        when(restTemplate.getForObject(anyString(), eq(String.class))).thenReturn(mockResponse);
//
//        Geolocation geo = geolocationService.getLatLongFromAddress("invalid address");
//
//        assertNull(geo);
//    }
//}
