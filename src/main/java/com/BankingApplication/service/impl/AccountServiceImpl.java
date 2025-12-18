package com.BankingApplication.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.BankingApplication.dto.AccountDto;
import com.BankingApplication.entity.Account;
import com.BankingApplication.mapper.AccountMapper;
import com.BankingApplication.repository.AccountRepository;
import com.BankingApplication.service.AccountService;
@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto getAccountById(Long id) {
        Account account = accountRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto deposit(Long id, Double amount) {
        Account account = accountRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        account.setBalance(account.getBalance() + amount);
        Account updatedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(updatedAccount);
    }

	@Override
	public AccountDto withdraw(Long id, double amount) {
		Account account = accountRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Account not found"));
		if(account.getBalance()<amount) {
			throw new RuntimeException("Insufficient funds");
		}
		double totalBalance=account.getBalance()-amount;
		account.setBalance(totalBalance);
		Account savedAccount=accountRepository.save(account);
		return AccountMapper.mapToAccountDto(savedAccount);
	}

	@Override
	public List<AccountDto> getAllAccounts() {
		return accountRepository.findAll().stream()
	    .map(account -> AccountMapper.mapToAccountDto(account))  
	    .collect(Collectors.toList());
	
	}

	@Override
	public void deleteAccount(Long id) {
		Account account = accountRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Account not found"));
		accountRepository.delete(account);
	}
    
    
}
