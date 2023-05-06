package com.project.major;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import com.project.major.entities.Account;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MyTestUtils {

    public static Account newAccount() {
        var account = new Account();
        account.setName(UUID.randomUUID().toString());
        account.setPassword("{noop}Password9!");
        account.setPasswordSetAt(Instant.now().truncatedTo(ChronoUnit.SECONDS));
        return account;
    }
}

