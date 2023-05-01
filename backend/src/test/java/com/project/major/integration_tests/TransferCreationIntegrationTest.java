package com.project.major.integration_tests;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.major.MyTestUtils;
import com.project.major.dto.TransferResource;
import com.project.major.repositories.AccountRepository;
import com.project.major.repositories.TransferRepository;
import com.project.major.services.TokenCreator;


class TransferCreationIntegrationTest extends AbstractIntegrationTest {
	
	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	private TransferRepository transferRepository;

	@Autowired	
	private TokenCreator tokenCreator;
	
	@Autowired
	private ObjectMapper mapper;

	@Test
	void should_createTransfer() throws Exception {
        
		// given
        var fromAccount = MyTestUtils.newAccount();
        fromAccount.setBalancePaise(1000000L);
		fromAccount = accountRepository.save(fromAccount);
		
        var toAccount = accountRepository.save(MyTestUtils.newAccount());
        var amountPaise = 1500L;
        var accessToken = tokenCreator.create(fromAccount.getId());
        var beginTime = Instant.now().truncatedTo(ChronoUnit.SECONDS);

        // when, then
        var result = mvc.perform(post("/transfers")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                   {
                                        "toAccountId" : %d,
                                        "amountPaise" : %d
                                   }
                                """.formatted(toAccount.getId(), amountPaise)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").isNumber())
                .andExpect(jsonPath("fromAccount").value(fromAccount.getId()))
                .andExpect(jsonPath("toAccount").value(toAccount.getId()))
                .andExpect(jsonPath("transferredAt").isString())
                .andExpect(jsonPath("amountPaise").value(amountPaise))
                .andReturn();

        var endTime = Instant.now().truncatedTo(ChronoUnit.SECONDS).plusSeconds(1L);
        var responseString = result.getResponse().getContentAsString();
        var transferResource = mapper.readValue(responseString, TransferResource.class);
        var updatedFromAccount = accountRepository.findById(fromAccount.getId());
        assertThat(updatedFromAccount.get().getBalancePaise()).isEqualTo(fromAccount.getBalancePaise() - amountPaise);
        
        var updatedToAccount = accountRepository.findById(toAccount.getId());
        assertThat(updatedToAccount.get().getBalancePaise()).isEqualTo(toAccount.getBalancePaise() + amountPaise);
        
        var transfers = transferRepository.findAll();
        assertThat(transfers).hasSize(1);
        var transfer = transfers.get(0);
        assertThat(transfer.getId()).isNotNull();
        assertThat(transfer.getId()).isEqualTo(transferResource.getId());        
        assertThat(transfer.getFromAccount().getId()).isEqualTo(fromAccount.getId());
        assertThat(transfer.getToAccount().getId()).isEqualTo(toAccount.getId());
     
        assertThat(transfer.getTransferredAt()).isAfterOrEqualTo(beginTime);
        assertThat(transfer.getTransferredAt()).isBeforeOrEqualTo(endTime);
        assertThat(transfer.getTransferredAt()).isEqualTo(Instant.parse(transferResource.getTransferredAt()));
        assertThat(transfer.getAmountPaise()).isEqualTo(amountPaise);
	}
}
