package com.project.major.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.major.dto.TransferResource;
import com.project.major.repositories.AccountRepository;
import com.project.major.repositories.TransferRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AllTransactionsGetter {
	
	private final AccountRepository accountRepository;
	private final TransferRepository transferRepository;
	
	
	public List<TransferResource> get(Integer id) {
		var account = accountRepository.findById(id).orElseThrow();
		
		log.info("Admin id: {} is fetching all transactions.", id);
		
		return transferRepository.findByOrderByTransferredAtAsc()
				.stream()
				.map(TransferResource::of)
				.collect(Collectors.toList());
	}
}
