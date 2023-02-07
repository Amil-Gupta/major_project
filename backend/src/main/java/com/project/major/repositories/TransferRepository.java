package com.project.major.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.major.entities.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
	
}
