package com.project.major.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
@SuppressWarnings("serial")
public class BusinessException extends RuntimeException {
	
	private final HttpStatus status;
	
	public BusinessException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}
}
