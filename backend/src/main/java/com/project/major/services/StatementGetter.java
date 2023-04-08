package com.project.major.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.project.major.dto.StatementResource;
import com.project.major.entities.Transfer;
import com.project.major.repositories.AccountRepository;
import com.project.major.repositories.TransferRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatementGetter {

	private final AccountRepository accountRepository;
	private final TransferRepository transferRepository;
	
	public StatementResource getStatement(Integer accountId, Pageable pageable) {
		var account = accountRepository.findById(accountId).orElseThrow();
		var sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("transferredAt").descending());
		
		Page<Transfer> transfers;
		if(account.isAdmin())
			transfers = transferRepository.findAll(sortedPageable);
		else 
			transfers = transferRepository.findByFromAccountOrToAccount(account, account, sortedPageable);
		
		return StatementResource.of(account, transfers);
	}
}
