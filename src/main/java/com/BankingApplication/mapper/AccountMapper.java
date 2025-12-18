package com.BankingApplication.mapper;

import com.BankingApplication.dto.AccountDto;
import com.BankingApplication.entity.Account;

public class AccountMapper {

    // Converts DTO to Entity
    public static Account mapToAccount(AccountDto accountDto) {
        Account account = new Account();
        account.setId(accountDto.getId()); // optional if ID is auto-generated
        account.setAccountHolderName(accountDto.getAccountHolderName());
        account.setBalance(accountDto.getBalance());
        return account;
    }

    // Converts Entity to DTO
    public static AccountDto mapToAccountDto(Account account) {
        AccountDto accountDto = new AccountDto();
        accountDto.setId(account.getId());
        accountDto.setAccountHolderName(account.getAccountHolderName());
        accountDto.setBalance(account.getBalance());
        return accountDto;
    }
}
