package com.project.major.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.major.dto.AccountCreationRequest;
import com.project.major.dto.AccountResource;
import com.project.major.entities.Account;
import com.project.major.repositories.AccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountCreator {
	
	private final PasswordEncoder passwordEncoder;
	private final AccountRepository accountRepository;
	
	public AccountResource create(AccountCreationRequest request) {
		
		var account = new Account();
		account.setName(request.getName());
		account.setPassword(passwordEncoder.encode(request.getPassword()));
		account.resetPasswordSetAt();
		accountRepository.save(account);
		var resource = AccountResource.of(account);
		log.info("Created {}. Returning {}", account, resource);
		
		return resource;
	}
}
