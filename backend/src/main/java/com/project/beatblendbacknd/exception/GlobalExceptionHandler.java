package com.project.beatblendbacknd.exception;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex) {
	Map<String, Object> body = new HashMap<>();
	body.put("error", "something went wrong");
	body.put("message", ex.getMessage());

	return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
