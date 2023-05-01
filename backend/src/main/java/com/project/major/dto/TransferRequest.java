package com.project.major.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TransferRequest {
	
	@NotNull
	private final Integer toAccountId;
	
	@NotNull
	@Min(1)	
	private final Long amountPaise;
}
