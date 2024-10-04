package com.project.beatblendbacknd.controller;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.beatblendbacknd.dto.AuthorizationTokenDto;
import com.project.beatblendbacknd.services.AuthorizationTokenService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AuthenticationController {
	private final AuthorizationTokenService authTokenService;
	

	@GetMapping("/test")
	public String testConnection() {
		return "connected";
	}
	
	@GetMapping("/login")
	public String getAccessToken(HttpSession session) {
		String token  = authTokenService.setAccessToken();
		session.setAttribute("token", token);
		return token;
	}
	
	@GetMapping("/getToken")
	public String getAccessToken1(HttpSession session) {
		return session.getAttribute("token").toString();
	}
	
}
