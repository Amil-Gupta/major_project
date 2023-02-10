package com.project.major.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.major.entities.Account;
import com.project.major.entities.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
	List<Transfer> findByFromAccountOrToAccount(Account fromAccount, Account toAccount);
}
