package com.project.major.error;

import java.util.List;

import org.springframework.validation.FieldError;

import lombok.Value;

@Value
public class MyFieldError {

    String code;
    String message;
    String field;
    
    public static MyFieldError of(FieldError error) {
    	return new MyFieldError(error.getCode(), error.getDefaultMessage(), error.getField());
    }
    
    public static List<MyFieldError> of(List<FieldError> errors) {
		return errors.stream().map(MyFieldError::of).toList();
    }
}
