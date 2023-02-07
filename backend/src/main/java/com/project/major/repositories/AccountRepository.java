package com.project.major.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.major.entities.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	
}
