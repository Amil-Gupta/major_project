package com.project.major.services;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.major.dto.PasswordChangeRequest;
import com.project.major.error.BusinessException;
import com.project.major.repositories.AccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordChangeService {
	private final PasswordEncoder passwordEncoder;
	private final AccountRepository accountRepository;

	public void change(Integer id, PasswordChangeRequest request) {
		var account = accountRepository.findById(id).orElseThrow();
		
		if (!passwordEncoder.matches(request.getOldPassword(), account.getPassword()))
			throw new BusinessException("Wrong Old Password!", HttpStatus.FORBIDDEN);
		
		account.setPassword(passwordEncoder.encode(request.getNewPassword()));
		account.resetPasswordSetAt();
		log.info("Changed password for account id: {}", account.getId());
		accountRepository.save(account);
	}
}
