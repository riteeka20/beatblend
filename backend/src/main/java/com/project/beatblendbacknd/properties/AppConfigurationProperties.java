package com.project.beatblendbacknd.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@ConfigurationProperties(prefix="spring.com.beatblend")
public class AppConfigurationProperties {

	private String clientId;
	private String clientSecretId;
	private String spotify_baseURL ;
	private String spotify_topArtists ;
	private String spotify_artists ;
	private String spotify_id;
	private String spotify_topTrack ;
	private String spotify_authurl ;
	private String spotify_tracks ;
	private String spotify_playlist ;
	private String spotify_search ;
	private String spotify_genreSearch ;
	private String spotify_searchCustom ;
	private String spotify_playlistCustom;
	private String spotify_recommendation;
	private String spotify_recommendationCustom ;
	private String spotify_featuredPlaylist ;
	private String spotify_gobalPlaylistId;
	private String spotify_typeTrack;
	private String musixmatch_baseurl ;
	private String musixmatch_apiKey ;
	private String musixmatch_lyrics ;
}
