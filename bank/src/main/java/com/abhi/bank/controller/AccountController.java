package com.abhi.bank.controller;

import com.abhi.bank.dto.AccountDto;
import com.abhi.bank.dto.TransferRequest;
import com.abhi.bank.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private AccountService accountService;

    public AccountController(AccountService accountService) {
        super();
        this.accountService = accountService;
    }
    //add account rest api
    @PostMapping
    public ResponseEntity<AccountDto> addAccount (@RequestBody AccountDto accountDto) {

        return new ResponseEntity<>(accountService.createAcoount(accountDto), HttpStatus.CREATED);

    }
//get single account
    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccountById(@PathVariable Long id) {

        AccountDto accountDto=accountService.getAccountById(id);

        return ResponseEntity.ok(accountDto);
    }

    @PutMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposit(@PathVariable Long id, @RequestBody Map<String, Double> request) {

       double amount = request.get("amount");
        AccountDto accountDto=accountService.deposit(id,amount);
        return ResponseEntity.ok(accountDto);
    }

    @PutMapping("/{id}/withdraw")
    public ResponseEntity<AccountDto> withdraw(@PathVariable Long id, @RequestBody Map<String, Double> request) {
        double amount = request.get("amount");
        AccountDto accountDto=accountService.withdraw(id,amount);
        return ResponseEntity.ok(accountDto);
    }
@GetMapping
    public ResponseEntity<List<AccountDto>>getAllAccounts() {
        List<AccountDto> accountDto= accountService.getAllAccounts();
        return ResponseEntity.ok(accountDto);

    }
@DeleteMapping("/{id}")
    public ResponseEntity<String>deleteAccountById(@PathVariable Long id) {
        accountService.deleteAccountById(id);
        return ResponseEntity.ok("Account deleted successfully");
    }

    @PostMapping("/transfer")
    public ResponseEntity<AccountDto> transferMoney(
            @RequestBody TransferRequest request) {

        System.out.println("TRANSFER API HIT");

        AccountDto response = accountService.transferRequest(
                request.getFromAccount(),
                request.getToAccount(),
                request.getAmount()
        );

        return ResponseEntity.ok(response);
    }
    }