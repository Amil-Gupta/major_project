package com.project.major.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.major.dto.TokenRequest;
import com.project.major.dto.TokenResource;
import com.project.major.services.LoginService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tokens")
@RequiredArgsConstructor
public class TokenController {
	
	private final LoginService tokenCreationService;
	
	@PostMapping
	public TokenResource getToken(@RequestBody @Valid TokenRequest request) {
		return tokenCreationService.create(request);
	}
}
