package com.project.major.dto;

import com.project.major.entities.Account;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class AccountResource {
	
	private final Integer id;
	private final Long balancePaise;
	
	public static AccountResource of(Account account) {
		return new AccountResource(account.getId(), account.getBalancePaise());
	}
}
