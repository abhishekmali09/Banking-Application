package com.abhi.bank.service.impl;

import com.abhi.bank.dto.AccountDto;
import com.abhi.bank.entity.Account;
import com.abhi.bank.mapper.AccountMapper;
import com.abhi.bank.repository.AccountRepository;
import com.abhi.bank.service.AccountService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {


    private AccountRepository accountRepository;
//also use the autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        super();
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAcoount(AccountDto accountDto) {

        Account account = AccountMapper.mapToAccount(accountDto);
       Account savedAccount= accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto getAccountById(Long id) {

     Account account= accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto deposit(Long id, double amount) {


        Account account= accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
        double totalBalance =account.getBalance()+amount;
        account.setBalance(totalBalance);
        Account savedAccount= accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto withdraw(Long id, double amount) {

        Account account= accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
        if (account.getBalance()<amount) {
            throw new RuntimeException("Insufficient balance");
        }
        double totalBalance =account.getBalance()-amount;
        account.setBalance(totalBalance);
        Account savedAccount= accountRepository.save(account);


        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public List<AccountDto> getAllAccounts() {

       return accountRepository.findAll().stream().map((account)->AccountMapper.mapToAccountDto(account)).collect(Collectors.toList());

    }

    @Override
    public void deleteAccountById(Long id) {
        Account account= accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));

        accountRepository.delete(account);

    }
    @Override

    public AccountDto transferRequest(Long fromAccountId,
                                      Long toAccountId,
                                      double amount) {

        Account fromAccount = accountRepository.findById(fromAccountId)
                .orElseThrow(() -> new RuntimeException("Sender account not found"));

        Account toAccount = accountRepository.findById(toAccountId)
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        if (amount <= 0) {
            throw new RuntimeException("Invalid transfer amount");
        }

        if (fromAccount.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        if (fromAccountId.equals(toAccountId)) {
            throw new RuntimeException("Cannot transfer to same account");
        }

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        return AccountMapper.mapToAccountDto(fromAccount);

    }

}
