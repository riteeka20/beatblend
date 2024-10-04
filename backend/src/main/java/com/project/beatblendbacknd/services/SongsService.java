package com.project.beatblendbacknd.services;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

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
public class SongsService {
	private final AppConfigurationProperties appConfig ;
	private RestTemplateHelper restTemplate;
	public org.json.simple.JSONObject getTopSongs(String token,String id) {
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_tracks() + appConfig.getSpotify_id() + id ;
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		return response;
	}
	
	public org.json.simple.JSONObject getSongByCountry(String token) {
		String playlistId = getPopularPlaylistId(token);
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_playlist() +"/"+ playlistId + appConfig.getSpotify_playlistCustom() ;
		
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		return response;
	}
	
	public org.json.simple.JSONObject getSongsByGenre(String token,String genreListId) {
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_search() + appConfig.getSpotify_genreSearch() + genreListId + appConfig.getSpotify_searchCustom()  ;
		
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		return response;
	}
	
	public JSONObject getSongDetails(String token,String songId) {
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_tracks() + appConfig.getSpotify_id() + songId;
		
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		JSONObject obj = new JSONObject(response);
		return obj;
	}
	
	public org.json.simple.JSONObject getTopChart(String token) {
		String createIndexUrl =appConfig.getSpotify_baseURL() + appConfig.getSpotify_playlist() +"/" + appConfig.getSpotify_gobalPlaylistId() +  appConfig.getSpotify_playlistCustom() ;
		
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		return response;
	}
	
	public org.json.simple.JSONObject getSearchTracks(String token,String searchString) {
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_search() + searchString + appConfig.getSpotify_typeTrack();
		System.out.println(createIndexUrl);
		HttpHeaders headers = new HttpHeaders();
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		return response;

	}
	
	public String getLyrics(String track_isrc) {
		
		String createIndexUrl = appConfig.getMusixmatch_baseurl() +  appConfig.getMusixmatch_lyrics() + track_isrc+ appConfig.getMusixmatch_apiKey();
	
		RestTemplate restTemplate = new RestTemplate();
	    String response = restTemplate.getForObject(createIndexUrl, String.class);
	
		return response;
	}
	
	
	public JSONObject getRelatedSongs(String token, String id) {
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_recommendation()+ id + appConfig.getSpotify_recommendationCustom();
		
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		JSONObject obj = new JSONObject(response);
		return obj;
	}
	

	public String getTrackIsrcId(JSONObject songdetails) {
		JSONArray obj1 = songdetails.getJSONArray("tracks");
		JSONObject obj2 = obj1.getJSONObject(0);
		JSONObject obj3 = obj2.getJSONObject("external_ids");
		return obj3.getString("isrc");
	}
	
	public JSONObject getPopularPlaylist(String token) {
		String createIndexUrl = appConfig.getSpotify_baseURL() + appConfig.getSpotify_featuredPlaylist();
		
		org.json.simple.JSONObject response = restTemplate.getRequest(token,createIndexUrl);
		JSONObject obj = new JSONObject(response);
		return obj;
	}
	
	public String getPlaylistId(JSONObject response) {
		JSONObject obj1 = response.getJSONObject("playlists");
		JSONArray obj2 = obj1.getJSONArray("items");
		JSONObject obj3 = obj2.getJSONObject(0);
		String playlistId = obj3.getString("id");
		return playlistId;
	}
	
	public String getPopularPlaylistId(String token) {
		JSONObject obj = getPopularPlaylist(token);
		String playlistId = getPlaylistId(obj);
		return playlistId;
	}
}
