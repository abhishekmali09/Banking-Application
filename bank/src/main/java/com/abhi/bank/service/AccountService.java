package com.abhi.bank.service;

import com.abhi.bank.dto.AccountDto;

import java.util.List;

public interface AccountService {

    AccountDto  createAcoount(AccountDto account);

    AccountDto getAccountById(Long id);

    AccountDto deposit( Long id,double amount);

    AccountDto withdraw(Long id,double amount);


    List<AccountDto> getAllAccounts();

    void deleteAccountById(Long id);

        AccountDto transferRequest(Long fromAccountId,
                                   Long toAccountId,
                                   double amount);

}
