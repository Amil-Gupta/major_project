package com.project.major.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
public class TokenRequest {
	
	private Integer accountId;

	@ToString.Exclude
	@NotBlank
	@Size(min=6, max=50)
	private String password;
}
