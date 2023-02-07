package com.project.major.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TransferRequest {
	
	@NotNull
	private Integer toAccountId;
	
	@NotNull
	@Min(1)	
	private Long amountPaise;
}
