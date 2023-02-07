package com.project.major.controllers;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.major.dto.AccountCreationRequest;
import com.project.major.dto.AccountResource;
import com.project.major.services.AccountCreator;
import com.project.major.services.AccountGetter;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {
	
	private final AccountCreator accountCreationService;
	private final AccountGetter accountGetter;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public AccountResource createAccount(@RequestBody @Valid AccountCreationRequest request) {
		return accountCreationService.create(request);
	}
	
	@GetMapping("/balance")
	public AccountResource getAccount(Principal principal) {
		return accountGetter.get(Integer.valueOf(principal.getName()));
	}
}
