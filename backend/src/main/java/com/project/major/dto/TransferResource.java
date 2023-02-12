package com.project.major.dto;

import com.project.major.entities.Transfer;

import lombok.Value;

@Value
public class TransferResource {
	
    private Long id;
	private Integer fromAccount;
	private Integer toAccount;
	private String transferredAt;
	private Long amountPaise;
	
	public static TransferResource of(Transfer transfer) {
		return new TransferResource(
				transfer.getId(),
				transfer.getFromAccount() == null ? null : transfer.getFromAccount().getId(),
				transfer.getToAccount() == null ? null : transfer.getToAccount().getId(),
				transfer.getTransferredAt().toString(),
				transfer.getAmountPaise()
		);
	}
}
