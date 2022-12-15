package com.project.major;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.externalpackage.test")
public class DummyBankingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(DummyBankingSystemApplication.class, args);
	}

}
