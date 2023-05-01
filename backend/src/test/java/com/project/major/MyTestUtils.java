package com.project.major;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import com.project.major.entities.Account;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MyTestUtils {

    public static final String RANDOM_USER_PASSWORD = "Password9!";

    public static Account newAccount() {
        var account = new Account();
        account.setName(UUID.randomUUID().toString());
        account.setPassword("{noop}" + RANDOM_USER_PASSWORD);
        account.setPasswordSetAt(Instant.now().truncatedTo(ChronoUnit.SECONDS));
        return account;
    }
}

