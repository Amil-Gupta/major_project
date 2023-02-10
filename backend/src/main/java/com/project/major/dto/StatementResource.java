package com.project.major.dto;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import com.project.major.entities.Account;
import com.project.major.entities.Transfer;

import lombok.Value;

@Value
public class StatementResource {
	
	Integer accountId;
	Long balancePaise;
	List<StatementRow> rows;
	
	public static StatementResource of(Account account, List<Transfer> transfers) {
		
		var rows = transfers.stream()
				.map(transfer -> new StatementRow(account, transfer))
				.toList();
		
		return new StatementResource(account.getId(), account.getBalancePaise(), rows);
	}
	
	@Value
	public static class StatementRow {
		
		LocalDate date;
		String description;
		Long withdrawalAmount;
		Long depositAmount;
		
		public StatementRow(Account account, Transfer transfer) {
			
			date = transfer.getTransferredAt().atZone(ZoneId.of("Asia/Kolkata")).toLocalDate();
			if (transfer.getFromAccount() == null) {
				description = "Cash Deposit";
				depositAmount = transfer.getAmountPaise();
				withdrawalAmount = null;
			} else if (transfer.getToAccount() == null) {
				description = "Cash Withdrawal";
				withdrawalAmount = transfer.getAmountPaise();
				depositAmount = null;
			} else if (transfer.getFromAccount().getId().equals(account.getId())) {
				description = "To Account " + transfer.getToAccount().getId();
				withdrawalAmount = transfer.getAmountPaise();
				depositAmount = null;				
			} else {
				description = "From Account " + transfer.getFromAccount().getId();
				withdrawalAmount = null;
				depositAmount = transfer.getAmountPaise();
			}
		}
	}
}