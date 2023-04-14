package com.project.major.config;

import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import com.project.major.repositories.AccountRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

	private final AccountRepository accountRepository;
	
	@Override
	public AbstractAuthenticationToken convert(Jwt jwt) {
		
		log.info("Converting {}", jwt);
		var accountId = Integer.valueOf(jwt.getSubject());
		var account = accountRepository.findById(accountId).orElseThrow();
		
        if (jwt.getIssuedAt().isBefore(account.getPasswordSetAt())) {
            log.warn("Obsolete token (issued at {}) used for account {}", jwt.getIssuedAt(), account);
            throw new CredentialsExpiredException("Obsolete token used for account %d".formatted(accountId));
        }
		
        return new JwtAuthenticationToken(jwt, List.of(), jwt.getSubject());
	}

}
