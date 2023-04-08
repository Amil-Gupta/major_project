package com.project.major.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.major.dto.AccountResource;
import com.project.major.dto.PasswordChangeRequest;
import com.project.major.repositories.AccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordChangeService {
	private final PasswordEncoder passwordEncoder;
	private final AccountRepository accountRepository;

	public AccountResource change(Integer id, PasswordChangeRequest request) {
		var account = accountRepository.findById(id).orElseThrow();
		account.setPassword(passwordEncoder.encode(request.getNewPassword()));
		log.info("Changed password for account id: {}", account.getId());
		accountRepository.save(account);
		return AccountResource.of(account);
	}
}
