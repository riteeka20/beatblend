package com.project.beatblendbacknd.services;

import static java.util.stream.Collectors.joining;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

import java.util.Map;
import java.util.TreeMap;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonObject;
import com.project.beatblendbacknd.helper.RestTemplateHelper;
import com.project.beatblendbacknd.properties.AppConfigurationProperties;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class ArtistsService {
	private final AppConfigurationProperties appConfig ;
	private RestTemplateHelper restTemplate;
	
	public org.json.simple.JSONObject getTopArtistsDetials(String token) {
		
		JSONObject response = getTopArtistsIds(token);
		String ids = getIdsFromJSON(response);
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_artists() + appConfig.getSpotify_id() + ids;
		org.json.simple.JSONObject responseEntity = restTemplate.getRequest(token,createIndexUrl);
		
		return responseEntity;
	}

	public JSONObject getTopArtistsIds(String token) {
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_topArtists();
		org.json.simple.JSONObject responseEntity = restTemplate.getRequest(token,createIndexUrl);
		JSONObject resObj = new JSONObject(responseEntity);
		return resObj;
	}
	
	private String getIdsFromJSON(JSONObject response) {
		
	
		JSONObject artistsArray =   response.getJSONObject("tracks");
		JSONArray artistsArray1 = artistsArray.getJSONArray("items");
		TreeMap<String,String> map = new TreeMap<String,String>();
	
		for (int i = 0; i < artistsArray1.length(); i++) {
			JSONObject obj1 = (JSONObject) artistsArray1.getJSONObject(i).get("track");
			JSONArray arr1 = obj1.getJSONArray("artists");
			for (int j=0;j<arr1.length();j++) {
				JSONObject obj2 = arr1.getJSONObject(j);
				map.put(obj2.getString("id"), obj2.getString("id"));
			}
			
		}
		 
		String idsSet = map.entrySet().stream().map(e-> e.getValue()).limit(50).collect(joining(","));
		return idsSet;
	}
	
	public org.json.simple.JSONObject getArtistsDetials(String token,String ids) {
		
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_artists() + appConfig.getSpotify_id()  + ids;
		org.json.simple.JSONObject responseEntity = restTemplate.getRequest(token,createIndexUrl);
		return responseEntity;
	}
	
	public org.json.simple.JSONObject getArtistsRelated(String token,String ids) {
		
		String createIndexUrl =appConfig.getSpotify_baseURL() + appConfig.getSpotify_artists() +"/" + ids + appConfig.getSpotify_topTrack();
		org.json.simple.JSONObject responseEntity = restTemplate.getRequest(token,createIndexUrl);
		return responseEntity;
	}
	
	public JSONObject getArtistsCompliedDetails(String token,String ids) {
			
		org.json.simple.JSONObject artistsdetails = getArtistsDetials(token,ids);
		org.json.simple.JSONObject artistsrelated = getArtistsRelated(token,ids);
		
		JSONObject artists = new JSONObject();
		artists.put("artists", new JSONObject(artistsdetails));
		artists.put("tracks", new JSONObject(artistsrelated));
		return artists;
	}
	
	
}
