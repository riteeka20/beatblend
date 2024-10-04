package com.project.beatblendbacknd.services;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.project.beatblendbacknd.dto.AuthorizationTokenDto;
import com.project.beatblendbacknd.properties.AppConfigurationProperties;

import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@EnableConfigurationProperties(value = AppConfigurationProperties.class)
public class AuthorizationTokenService {

    private final AppConfigurationProperties appConfig;

    @Getter
    private AuthorizationTokenDto authObject;

    public String getToken() {
	String URL = appConfig.getSpotify_authurl();
	HttpHeaders http = new HttpHeaders();
	http.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
	http.set("Authorization", "Basic " + Base64.getEncoder()
		.encodeToString((appConfig.getClientId() + ":" + appConfig.getClientSecretId()).getBytes()));

	LinkedMultiValueMap valueMap = new LinkedMultiValueMap<>();
	valueMap.add("client_id", appConfig.getClientId());
	valueMap.add("grant_type", "client_credentials");
	valueMap.add("client_secret", appConfig.getClientSecretId());

	HttpEntity<LinkedMultiValueMap<String, String>> httpEntity = new HttpEntity<>(valueMap, http);

	RestTemplate restTemplate = new RestTemplate();
	ResponseEntity<AuthorizationTokenDto> responseEntity = restTemplate.postForEntity(URL, httpEntity,
		AuthorizationTokenDto.class);
	authObject = responseEntity.getBody();

	authObject.setTimeStart(Instant.now());
	return authObject.getAccess_token();
    }

    public String setAccessToken() {
	String token = null;
	Instant timeNow = Instant.now();
	try {
	    AuthorizationTokenDto authObject = getAuthObject();
	    long secondsDifference = Duration.between(authObject.getTimeStart(), timeNow).getSeconds();
	    if (secondsDifference >= authObject.getExpires_in()) {
		token = getToken();
	    } else {
		token = authObject.getAccess_token();
	    }
	} catch (Exception e) {
	    token = getToken();
	}
	return token;
    }

    public String checkAccessToken(HttpSession session) {
	String token = "";
	try {
	    token = session.getAttribute("token").toString();
	} catch (Exception e) {
	    // TODO: handle exception
	}
	if (token.length() == 0) {
	    token = setAccessToken();
	    session.setAttribute("token", token);
	}
	return token;
    }

}
