package com.project.major.controllers;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.major.dto.CashRequest;
import com.project.major.dto.TransferResource;
import com.project.major.services.CashService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class CashController {
	
	private final CashService cashService;

	
	@PostMapping("/deposits")
	@ResponseStatus(HttpStatus.CREATED)
	public TransferResource deposit(@RequestBody @Valid CashRequest request, Principal principal) {
		return cashService.createDeposit(Integer.valueOf(principal.getName()), request);
	}
}
