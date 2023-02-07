package com.project.major.error;

import java.util.List;

import lombok.Value;

@Value
public class Problem {

    String type;
    String message;
    List<MyFieldError> errors;
}
