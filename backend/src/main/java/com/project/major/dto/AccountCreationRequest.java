package com.project.major.dto;

import com.project.major.entities.Account;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
public class AccountCreationRequest {

	@ToString.Exclude
	@NotBlank
	@Size(min=1, max=Account.NAME_MAX_LEN)
	private String name;

	@ToString.Exclude
	@NotBlank
	@Size(min=6, max=50)
	private String password;
}
