package com.project.beatblendbacknd.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;
import com.project.beatblendbacknd.services.ArtistsService;
import com.project.beatblendbacknd.services.AuthorizationTokenService;
import com.project.beatblendbacknd.services.SongsService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin
public class ArtistsController {
	
	public final ArtistsService artistsService;
	private final AuthorizationTokenService authService;
	
	
	@GetMapping("/artists/{id}")
	public Map<String, Object> getArtistsDetails(@PathVariable(value="id") String id,HttpSession session) {
		String token = authService.checkAccessToken(session);
		JSONObject artistsdetails = artistsService.getArtistsCompliedDetails(token,id);
		return artistsdetails.toMap();
	}
	
	
	@GetMapping("/topartists")
	public org.json.simple.JSONObject getTopArtists(HttpSession session) {
		String token = authService.checkAccessToken(session);
		org.json.simple.JSONObject  artistsdetails = artistsService.getTopArtistsDetials(token);
		return artistsdetails;
	}
	

}
