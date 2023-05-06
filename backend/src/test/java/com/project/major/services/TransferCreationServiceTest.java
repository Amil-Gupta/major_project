package com.project.major.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import com.project.major.dto.TransferRequest;
import com.project.major.entities.Account;
import com.project.major.entities.Transfer;
import com.project.major.error.BusinessException;
import com.project.major.repositories.AccountRepository;
import com.project.major.repositories.TransferRepository;

@ExtendWith(MockitoExtension.class)
class TransferCreationServiceTest {
	
	@Mock
	private TransferRepository transferRepository;
	
	@Mock
	private AccountRepository accountRepository;

	@InjectMocks
	private TransferCreationService subject;
	
	@Captor
	private ArgumentCaptor<Transfer> transferCaptor;
	
	@Test
	void should_createTransfer() {
		
		// given
		var fromAccountId = 245;
		var fromAccountInitialBalance = 750L;
		var transferRequest = new TransferRequest(150, 450L);
		var fromAccount = new Account();
		fromAccount.setId(fromAccountId);
		fromAccount.setBalancePaise(fromAccountInitialBalance);
		given(accountRepository.findById(fromAccountId)).willReturn(Optional.of(fromAccount));	
		
		var toAccount = new Account();
		var toAccountInitialBalance = 600L;
		toAccount.setId(transferRequest.getToAccountId());
		toAccount.setBalancePaise(toAccountInitialBalance);
		given(accountRepository.findById(transferRequest.getToAccountId())).willReturn(Optional.of(toAccount));	
		
		var transferId = 890L; 
		given(transferRepository.save(any(Transfer.class))).willAnswer(invocation -> {
			var transfer = (Transfer) invocation.getArgument(0);
			transfer.setId(transferId);
			return transfer;
		});
        
		var beginTime = Instant.now().truncatedTo(ChronoUnit.SECONDS);

		// when
		var transferResource = subject.create(fromAccountId, transferRequest);
		
		// then
        var endTime = Instant.now().truncatedTo(ChronoUnit.SECONDS).plusSeconds(1L);

		verify(transferRepository).save(transferCaptor.capture());
		var transfer = transferCaptor.getValue();
        assertThat(transfer.getId()).isEqualTo(transferId);
        assertThat(transfer.getId()).isEqualTo(transferResource.getId());        
        assertThat(transfer.getFromAccount().getId()).isEqualTo(fromAccount.getId());
        assertThat(transfer.getToAccount().getId()).isEqualTo(toAccount.getId());
        assertThat(transfer.getAmountPaise()).isEqualTo(transferRequest.getAmountPaise());
        
        assertThat(transfer.getTransferredAt()).isAfterOrEqualTo(beginTime);
        assertThat(transfer.getTransferredAt()).isBeforeOrEqualTo(endTime);
        assertThat(transfer.getTransferredAt()).isEqualTo(Instant.parse(transferResource.getTransferredAt()));
        assertThat(fromAccount.getBalancePaise()).isEqualTo(fromAccountInitialBalance - transferRequest.getAmountPaise());
        assertThat(toAccount.getBalancePaise()).isEqualTo(toAccountInitialBalance + transferRequest.getAmountPaise());
  
		verify(accountRepository).save(fromAccount);
		verify(accountRepository).save(toAccount);
	}
	
	@Test
	void shouldNot_createTransfer_when_fromAndToAccountsAreSame() {
		
		// given
		var fromAccountId = 245;
		var transferRequest = new TransferRequest(fromAccountId, 450L);
		
		// when, then		
		BusinessException thrown = assertThrows(
	            BusinessException.class,
	            () -> subject.create(fromAccountId, transferRequest)
	     );

	     assertThat(thrown.getMessage()).isEqualTo("You can't transfer to your own account %d !".formatted(fromAccountId));
	     assertThat(thrown.getStatus()).isEqualTo(HttpStatus.UNPROCESSABLE_ENTITY);
	}
	
	@Test
	void admin_shouldNot_transfer() {
		
		// given
		var fromAccountId = 245;
		var transferRequest = new TransferRequest(150, 450L);
		var fromAccount = new Account();
		fromAccount.setId(fromAccountId);
		fromAccount.setAdmin(true);
		given(accountRepository.findById(fromAccountId)).willReturn(Optional.of(fromAccount));	

		// when, then		
		BusinessException thrown = assertThrows(
	            BusinessException.class,
	            () -> subject.create(fromAccountId, transferRequest)
	     );

	     assertThat(thrown.getMessage()).isEqualTo("Admin can't transfer money !");
	     assertThat(thrown.getStatus()).isEqualTo(HttpStatus.UNPROCESSABLE_ENTITY);
	}

	@Test
	void shouldNot_createTransfer_when_recieverAccountNotFound() {
		
		// given
		var fromAccountId = 245;
		var transferRequest = new TransferRequest(150, 450L);
		var fromAccount = new Account();
		fromAccount.setId(fromAccountId);
		given(accountRepository.findById(fromAccountId)).willReturn(Optional.of(fromAccount));	
		given(accountRepository.findById(transferRequest.getToAccountId())).willReturn(Optional.empty());	
		
		// when, then		
		BusinessException thrown = assertThrows(
	            BusinessException.class,
	            () -> subject.create(fromAccountId, transferRequest)
	     );

	     assertThat(thrown.getMessage()).isEqualTo("Receiver Account %d not found!".formatted(transferRequest.getToAccountId()));
	     assertThat(thrown.getStatus()).isEqualTo(HttpStatus.NOT_FOUND);
	}

	@Test
	void admin_shouldNot_recieveMoney() {
		
		// given
		var fromAccountId = 245;
		var transferRequest = new TransferRequest(150, 450L);
		var fromAccount = new Account();
		fromAccount.setId(fromAccountId);
		given(accountRepository.findById(fromAccountId)).willReturn(Optional.of(fromAccount));	

		var toAccount = new Account();
		toAccount.setId(transferRequest.getToAccountId());
		toAccount.setAdmin(true);
		given(accountRepository.findById(transferRequest.getToAccountId())).willReturn(Optional.of(toAccount));	

		// when, then		
		BusinessException thrown = assertThrows(
	            BusinessException.class,
	            () -> subject.create(fromAccountId, transferRequest)
	     );

	     assertThat(thrown.getMessage()).isEqualTo("Money can't be transferred to an admin !");
	     assertThat(thrown.getStatus()).isEqualTo(HttpStatus.UNPROCESSABLE_ENTITY);
	}
	
	@Test
	void shouldNot_transfer_when_insufficientBalance() {
		
		// given
		var fromAccountId = 245;
		var transferRequest = new TransferRequest(150, 450L);
		var fromAccount = new Account();
		fromAccount.setId(fromAccountId);
		fromAccount.setBalancePaise(transferRequest.getAmountPaise() - 1);
		given(accountRepository.findById(fromAccountId)).willReturn(Optional.of(fromAccount));	

		var toAccount = new Account();
		toAccount.setId(transferRequest.getToAccountId());
		given(accountRepository.findById(transferRequest.getToAccountId())).willReturn(Optional.of(toAccount));	

		// when, then		
		BusinessException thrown = assertThrows(
	            BusinessException.class,
	            () -> subject.create(fromAccountId, transferRequest)
	     );

	     assertThat(thrown.getMessage()).isEqualTo("Your balance %d in account %d is insufficient for transfer of amount %d".formatted(
					fromAccount.getBalancePaise(),
					fromAccountId,
					transferRequest.getAmountPaise()));
	     assertThat(thrown.getStatus()).isEqualTo(HttpStatus.UNPROCESSABLE_ENTITY);
	}

}
