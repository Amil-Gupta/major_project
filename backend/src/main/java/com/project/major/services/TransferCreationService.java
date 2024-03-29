package com.project.major.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.major.dto.TransferRequest;
import com.project.major.dto.TransferResource;
import com.project.major.entities.Account;
import com.project.major.entities.Transfer;
import com.project.major.error.BusinessException;
import com.project.major.repositories.AccountRepository;
import com.project.major.repositories.TransferRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransferCreationService {
	
	private final TransferRepository transferRepository;
	private final AccountRepository accountRepository;
	
	@Transactional
	public TransferResource create(Integer fromAccountId, TransferRequest transferRequest) {
		
		if (fromAccountId.equals(transferRequest.getToAccountId())) 
			throw new BusinessException("You can't transfer to your own account %d !".formatted(fromAccountId), HttpStatus.UNPROCESSABLE_ENTITY);
		
		Account fromAccount = accountRepository.findById(fromAccountId).orElseThrow();
		if (fromAccount.isAdmin())
			throw new BusinessException("Admin can't transfer money !", HttpStatus.UNPROCESSABLE_ENTITY);
		
		Account toAccount = accountRepository.findById(transferRequest.getToAccountId()).orElseThrow(() ->
			new BusinessException("Receiver Account %d not found!".formatted(transferRequest.getToAccountId()), HttpStatus.NOT_FOUND));
		if (toAccount.isAdmin())
			throw new BusinessException("Money can't be transferred to an admin !", HttpStatus.UNPROCESSABLE_ENTITY);
		
		if (fromAccount.getBalancePaise() < transferRequest.getAmountPaise()) {
			throw new BusinessException("Your balance %d in account %d is insufficient for transfer of amount %d".formatted(
					fromAccount.getBalancePaise(),
					fromAccountId,
					transferRequest.getAmountPaise()), HttpStatus.UNPROCESSABLE_ENTITY);
		} 
		
		Transfer transfer = new Transfer();
		transfer.setAmountPaise(transferRequest.getAmountPaise());
		transfer.setFromAccount(fromAccount);
		transfer.setToAccount(toAccount);
		transfer.setTransferredAt(Instant.now().truncatedTo(ChronoUnit.SECONDS));
		transferRepository.save(transfer);
		
		fromAccount.setBalancePaise(fromAccount.getBalancePaise() - transferRequest.getAmountPaise());
		toAccount.setBalancePaise(toAccount.getBalancePaise() + transferRequest.getAmountPaise());
		accountRepository.save(fromAccount);
		accountRepository.save(toAccount);
		
		return TransferResource.of(transfer);			
	}
}
