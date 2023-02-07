package com.project.major.controllers;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
}
