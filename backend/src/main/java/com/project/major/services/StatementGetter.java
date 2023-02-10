package com.project.major.services;

import org.springframework.stereotype.Service;

import com.project.major.dto.StatementResource;
import com.project.major.repositories.AccountRepository;
import com.project.major.repositories.TransferRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatementGetter {

	private final AccountRepository accountRepository;
	private final TransferRepository transferRepository;
	
	public StatementResource getStatement(Integer accountId) {
		var account = accountRepository.findById(accountId).orElseThrow();
		var transfers = transferRepository.findByFromAccountOrToAccount(account, account);
		return StatementResource.of(account, transfers);
	}
}
