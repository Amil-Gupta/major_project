package com.project.major.services;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.major.dto.CashRequest;
import com.project.major.dto.TransferResource;
import com.project.major.entities.Account;
import com.project.major.entities.Transfer;
import com.project.major.error.BusinessException;
import com.project.major.repositories.AccountRepository;
import com.project.major.repositories.TransferRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CashService {
	
	private static final int ADMIN_ID = 5;
	private final AccountRepository accountRepository;
	private final TransferRepository transferRepository;
	
	@Transactional
	public TransferResource createDeposit(Integer adminId, CashRequest request) {
		
		if(adminId != ADMIN_ID)
			throw new BusinessException("Only admin can deposit/withdraw cash!", HttpStatus.FORBIDDEN);
		
		if(request.getAmountPaise() == 0)
			throw new BusinessException("You can't deposit 0 amount!", HttpStatus.UNPROCESSABLE_ENTITY);
		
		Account account = accountRepository.findById(request.getAccountId()).orElseThrow(() ->
			new BusinessException("Account %d not found!".formatted(request.getAccountId()), HttpStatus.NOT_FOUND));
		
		if (hasInsufficientBalanceForWithdrawal(account, request)) {
			throw new BusinessException("Balance %d in account %d is insufficient for withdrawal of amount %d".formatted(
					account.getBalancePaise(),
					account.getId(),
					request.getAmountPaise()), HttpStatus.UNPROCESSABLE_ENTITY);
		}
		
		Transfer transfer = new Transfer();
		transfer.setAmountPaise(Math.abs(request.getAmountPaise()));
		
		if (request.getAmountPaise() > 0) {
			transfer.setFromAccount(null);
			transfer.setToAccount(account);			
		} else {
			transfer.setFromAccount(account);
			transfer.setToAccount(null);						
		}

		transfer.setTransferredAt(Instant.now());
		transferRepository.save(transfer);
			
		account.setBalancePaise(account.getBalancePaise() + request.getAmountPaise());
		accountRepository.save(account);
		
		return TransferResource.of(transfer);
	}
	
	private boolean hasInsufficientBalanceForWithdrawal(Account account, CashRequest request) { 
		return request.getAmountPaise() < 0 && account.getBalancePaise() < -request.getAmountPaise();
	}
}
