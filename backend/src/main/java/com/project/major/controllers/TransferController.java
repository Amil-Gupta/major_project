package com.project.major.controllers;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.major.dto.TransferRequest;
import com.project.major.dto.TransferResource;
import com.project.major.services.TransferCreationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/transfers")
@RequiredArgsConstructor
public class TransferController {
	
	private final TransferCreationService transferCreationService;

	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public TransferResource createTransfer(@RequestBody @Valid TransferRequest request, Principal principal) {
		return transferCreationService.create(Integer.valueOf(principal.getName()), request);
	}
}
