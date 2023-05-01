package com.project.major.services;

import static java.util.concurrent.TimeUnit.DAYS;

import java.time.Instant;

import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenCreator {
	
    private final JwtEncoder jwtEncoder;
    
    public String create(Integer accountId) {
    	
    	JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusMillis(DAYS.toMillis(15)))
				.subject(accountId.toString())
                .build();

		return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}
