package com.project.major.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class CashRequest {
	
	@NotNull
	Integer accountId;
	
	@NotNull
	Long amountPaise;
}
