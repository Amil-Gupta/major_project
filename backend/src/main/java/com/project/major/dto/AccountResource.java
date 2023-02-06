package com.project.major.dto;

import com.project.major.entities.Account;

import lombok.Value;

@Value
public class AccountResource {
	
	Integer id;
	Long balancePaise;
	
	public static AccountResource of(Account account) {
		return new AccountResource(account.getId(), account.getBalancePaise());
	}
}
