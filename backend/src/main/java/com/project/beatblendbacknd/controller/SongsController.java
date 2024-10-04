package com.project.beatblendbacknd.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;
import com.project.beatblendbacknd.services.AuthorizationTokenService;
import com.project.beatblendbacknd.services.SongsService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin
public class SongsController {

    public final SongsService songDetialsService;
    private final AuthorizationTokenService authService;

    @GetMapping("test1")
    public String testConnection() {
	return "connected";
    }

    @GetMapping("/discover")
    public org.json.simple.JSONObject getTopSongs(HttpSession session) {
	String token = authService.checkAccessToken(session);
	org.json.simple.JSONObject obj1 = songDetialsService.getSongsByGenre(token, "POP");
	return obj1;
    }

    @GetMapping("/search/{searchString}")
    public org.json.simple.JSONObject getSearchedSong(@PathVariable(value = "searchString") String searchString,
	    HttpSession session) {
	String token = authService.checkAccessToken(session);
	org.json.simple.JSONObject obj1 = songDetialsService.getSearchTracks(token, searchString);
	return obj1;
    }

    @GetMapping("/songs/{id}")
    public Map<String, Object> getSongeDetails(@PathVariable(value = "id") String id, HttpSession session) {
	String token = authService.checkAccessToken(session);
	JSONObject songDetials = songDetialsService.getSongDetails(token, id);
	JSONObject songRelated = songDetialsService.getRelatedSongs(token, id);
	String tracks_isrc = songDetialsService.getTrackIsrcId(songDetials);
	String res = songDetialsService.getLyrics(tracks_isrc);
	JSONObject lyrics = new JSONObject(res);

	JSONObject song = new JSONObject();
	song.put("track", songDetials);
	song.put("related", songRelated);
	song.put("lyrics", lyrics);
	return song.toMap();
    }

    @GetMapping("/discover/{genreListId}")
    public org.json.simple.JSONObject getSongByGenre(@PathVariable(value = "genreListId") String genreListId,
	    HttpSession session) {
	String token = authService.checkAccessToken(session);
	org.json.simple.JSONObject obj1 = songDetialsService.getSongsByGenre(token, genreListId);
	return obj1;
    }

    @GetMapping("/around-you")
    public org.json.simple.JSONObject getSongsByCountry(HttpSession session) {
	String token = authService.checkAccessToken(session);
	org.json.simple.JSONObject obj1 = songDetialsService.getSongByCountry(token);
	return obj1;
    }

    @GetMapping("/topcharts")
    public org.json.simple.JSONObject getTopCharts(HttpSession session) {
	String token = authService.checkAccessToken(session);
	org.json.simple.JSONObject obj1 = songDetialsService.getTopChart(token);
	return obj1;
    }

}
