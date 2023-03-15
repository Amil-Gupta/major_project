package com.project.major.controllers;

import java.security.Principal;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.major.dto.AccountCreationRequest;
import com.project.major.dto.AccountResource;
import com.project.major.dto.StatementResource;
import com.project.major.services.AccountCreator;
import com.project.major.services.AccountGetter;
import com.project.major.services.StatementGetter;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {
	
	private final AccountCreator accountCreationService;
	private final AccountGetter accountGetter;
	private final StatementGetter statementGetter;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public AccountResource createAccount(@RequestBody @Valid AccountCreationRequest request) {
		return accountCreationService.create(request);
	}
	
	@GetMapping("/detail")
	public AccountResource getAccount(Principal principal) {
		return accountGetter.get(Integer.valueOf(principal.getName()));
	}
	
	@GetMapping("/statement")
	public StatementResource getStatement(Principal principal, @PageableDefault(size = 2000, page = 0) Pageable pageable) {
		return statementGetter.getStatement(Integer.valueOf(principal.getName()), pageable);
	}
}
