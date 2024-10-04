package com.project.beatblendbacknd.dto;

import java.time.Instant;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthorizationTokenDto {
	
	private String access_token;
	
	private int expires_in;
	
	@Setter
	private Instant timeStart;

}
