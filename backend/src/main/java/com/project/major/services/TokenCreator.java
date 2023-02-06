package com.project.major.services;

import static java.util.concurrent.TimeUnit.DAYS;

import java.time.Instant;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.project.major.dto.TokenRequest;
import com.project.major.dto.TokenResource;
import com.project.major.repositories.AccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenCreator {

    private final JwtEncoder jwtEncoder;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    
    public TokenResource create(TokenRequest request) {
    	
    	var account = accountRepository
    			.findById(request.getAccountId())
    			.orElseThrow(() -> new BadCredentialsException("Bad Credentials"));
    	
    	if (!passwordEncoder.matches(request.getPassword(), account.getPassword()))
    		throw new BadCredentialsException("Bad Credentials");
    	
    	JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusMillis(DAYS.toMillis(15)))
				.subject(request.getAccountId().toString())
                .build();

		var token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
		var tokenResource = new TokenResource(token);
		log.info("Created token for {}: {}", request, tokenResource);
		return tokenResource;
    }
}
