package com.project.major.services;

import org.springframework.stereotype.Service;

import com.project.major.dto.AccountResource;
import com.project.major.repositories.AccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountGetter {
	
	private final AccountRepository accountRepository;
	
	public AccountResource get(Integer accountId) {
		var account = accountRepository.findById(accountId).orElseThrow();
		var resource = AccountResource.of(account);
		log.info("Created {}. Returning {}", account, resource);
		
		return resource;
	}
}
