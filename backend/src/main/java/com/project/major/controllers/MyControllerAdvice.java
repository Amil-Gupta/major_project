package com.project.major.controllers;

import java.util.Collections;

import org.hibernate.StaleObjectStateException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.major.error.BusinessException;
import com.project.major.error.MyFieldError;
import com.project.major.error.Problem;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class MyControllerAdvice {
	
	@ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	public Problem handleException(MethodArgumentNotValidException ex) {

        var problem = new Problem("MethodArgumentNotValidException", ex.getMessage(), MyFieldError.of(ex.getFieldErrors()));
        log.info("MethodArgumentNotValidException (%s): %s".formatted(ex.getMessage(), problem), ex);
        return problem;
    }
	
	@ExceptionHandler(value = BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
	public Problem handleException(BadCredentialsException ex) {

        var problem = new Problem("BadCredentialsException", ex.getMessage(), Collections.emptyList());
        log.info("BadCredentialsException (%s): %s".formatted(ex.getMessage(), problem), ex);
        return problem;
    }
	
	@ExceptionHandler(value = BusinessException.class)
	public ResponseEntity<Problem> handleException(BusinessException ex) {
		
		var problem = new Problem("BusinessException", ex.getMessage(), Collections.emptyList());
		log.info("BusinessException (%s): %s".formatted(ex.getMessage(), problem), ex);
		return ResponseEntity.status(ex.getStatus()).body(problem);
	}
	
	@ExceptionHandler(value = StaleObjectStateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
	public Problem handleException(StaleObjectStateException ex) {

        var problem = new Problem("StaleObjectStateException", ex.getMessage(), Collections.emptyList());
        log.info("StaleObjectStateException (%s): %s".formatted(ex.getMessage(), problem), ex);
        return problem;
    }
}
