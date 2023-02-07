package com.project.major.entities;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(indexes = {
    @Index(name = "idx_transfer_from_account_id", columnList = "from_account_id"),
	@Index(name = "idx_transfer_to_account_id", columnList = "to_account_id")
})
public class Transfer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="from_account_id", nullable=false)
	@ToString.Exclude
	private Account fromAccount;

	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="to_account_id", nullable=false)
	@ToString.Exclude
	private Account toAccount;
	
	@Column(nullable=false)
	private Instant transferredAt;
	
	@Column(nullable=false)
	private Long amountPaise; 
}
