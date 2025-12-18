package com.BankingApplication.service;

import java.util.List;

import com.BankingApplication.dto.AccountDto;
import com.BankingApplication.entity.Account;

public interface AccountService {
AccountDto createAccount(AccountDto account);
AccountDto getAccountById(Long id);
AccountDto deposit(Long id, Double amount);
AccountDto withdraw(Long id,double amount);
List<AccountDto>getAllAccounts();
void deleteAccount(Long id);
}
