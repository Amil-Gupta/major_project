package com.project.major.services;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.major.dto.TokenRequest;
import com.project.major.dto.TokenResource;
import com.project.major.repositories.AccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final TokenCreator tokenCreator;
    
    public TokenResource create(TokenRequest request) {
    	
    	var account = accountRepository
    			.findById(request.getAccountId())
    			.orElseThrow(() -> new BadCredentialsException("User Does Not Exist."));
    	
    	if (!passwordEncoder.matches(request.getPassword(), account.getPassword()))
    		throw new BadCredentialsException("Kindly Recheck Your Password.");
    	
		var token = tokenCreator.create(request.getAccountId());
		var tokenResource = new TokenResource(token);
		log.info("Created token for {}: {}", request, tokenResource);
		return tokenResource;
    }
}
