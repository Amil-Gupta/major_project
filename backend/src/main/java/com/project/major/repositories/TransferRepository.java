package com.project.major.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.major.entities.Account;
import com.project.major.entities.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
	Page<Transfer> findByFromAccountOrToAccount(Account fromAccount, Account toAccount, Pageable pageable);
	Page<Transfer> findAll(Pageable pageable);
}
