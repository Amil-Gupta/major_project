package com.project.major.dto;

import com.project.major.entities.Account;

import lombok.Value;

@Value
public class AccountResource {

	Integer id;
	String name;
	Long balancePaise;
	boolean admin;

	public static AccountResource of(Account account) {
		return new AccountResource(
				account.getId(), 
				account.getName(), 
				account.getBalancePaise(), 
				account.isAdmin()
		);
	}
}
