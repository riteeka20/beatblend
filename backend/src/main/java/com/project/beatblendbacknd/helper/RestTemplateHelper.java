package com.project.beatblendbacknd.helper;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestTemplateHelper {
	
	public JSONObject getRequest(String token, String createIndexUrl) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", APPLICATION_FORM_URLENCODED_VALUE);
		headers.set("Authorization", "Bearer " + token);
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<org.json.simple.JSONObject> responseEntity = restTemplate.exchange(createIndexUrl, GET, new HttpEntity(headers), org.json.simple.JSONObject.class);
		
		return responseEntity.getBody();
	}
}
