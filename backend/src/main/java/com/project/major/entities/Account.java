package com.project.major.entities;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.hibernate.annotations.Check;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Check(constraints = "balance_paise >= 0")
public class Account {
	
	public static final int NAME_MAX_LEN = 100;
	public static final String ROLE_ADMIN = "ROLE_ADMIN"; 
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

	@Column(nullable = false, length = NAME_MAX_LEN)
	private String name;
	
	@Column(nullable = false, length = 2000)
	private String password;
	
	@Column(nullable = false)
	private Long balancePaise = 0L;
	
	private boolean admin = false;
	
    // A JWT issued before this won't be valid
    @Column(nullable = false)
    private Instant passwordSetAt;
	
	@Version
	private Integer version;

    public void resetPasswordSetAt() {
        passwordSetAt = Instant.now().truncatedTo(ChronoUnit.SECONDS);
    }
}
