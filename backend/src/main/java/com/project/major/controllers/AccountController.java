package com.project.major.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.major.dto.AccountCreationRequest;
import com.project.major.dto.AccountResource;
import com.project.major.services.AccountCreator;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {
	
	private final AccountCreator accountCreationService;
	
	@PostMapping
	public AccountResource createAccount(@RequestBody @Valid AccountCreationRequest request) {
		return accountCreationService.create(request);
	}
}
