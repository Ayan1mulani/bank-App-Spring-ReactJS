package JavaLearning.hiber.Controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import JavaLearning.hiber.Payload.BorrowMoneyDTO;
import JavaLearning.hiber.Payload.RepayDTO;
import JavaLearning.hiber.Payload.TramsactionDTO;
import JavaLearning.hiber.Payload.TransactionsViewDTO;
import JavaLearning.hiber.Service.AccountService;
import JavaLearning.hiber.Service.BankService;
import JavaLearning.hiber.Service.BorrowMoneyService;
import JavaLearning.hiber.Service.TransactionService;
import JavaLearning.hiber.models.Accounts;
import JavaLearning.hiber.models.BankAccount;
import JavaLearning.hiber.models.BankTransaction;
import JavaLearning.hiber.models.BorrowMoney;
import JavaLearning.hiber.util.Constants.AccountSuccess;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/Transaction")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

@Tag(name = "Bank Account Controller", description = "Controller for your auth manager")
@Slf4j
public class TransactionController {

 
    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private BankService bankService;

    @Autowired
    private BorrowMoneyService borrowMoneyService;


@PostMapping(value = "/transfer/Money", consumes = "application/json", produces = "application/json")
@ResponseStatus(HttpStatus.CREATED)
@ApiResponse(responseCode = "400", description = "Something went Wrong")
@ApiResponse(responseCode = "201", description = "Transaction successful")
@SecurityRequirements(@SecurityRequirement(name = "demo-application"))
public ResponseEntity<String> sendMoney(@RequestBody TramsactionDTO transactionDTO, Authentication authentication) {
    try {
        String email = authentication.getName();
        Optional<Accounts> optionalAccount = accountService.findByEmail(email);
        if (optionalAccount.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user details");
        }
    
        Accounts loggedInAccount = optionalAccount.get();
        Optional<BankAccount> senderAccount = bankService.findBankAccountByUser(loggedInAccount);
    
        int amount = transactionDTO.getAmount();
        Long reciverAccountID = transactionDTO.getReciverAccountID();
    
        // Create and prepare the transaction record
        BankTransaction bankTransaction = new BankTransaction();
        bankTransaction.setAmount(amount);
        bankTransaction.setReceiverAccountNumber(transactionDTO.getReciverAccountID());
        bankTransaction.setBankAccount(senderAccount.get());
        bankTransaction.setSenderAccountNumber(senderAccount.get().getAccountNumber());
        // Save the transaction record first (for audit/history purposes)
        transactionService.saveTransaction(bankTransaction);
        
    
        Optional<BankAccount> receiverAccount = bankService.findByAccountNumber(reciverAccountID);
    
        if (senderAccount.isPresent() && receiverAccount.isPresent()) {
            transactionService.sentMoney(senderAccount.get(), amount, receiverAccount.get());
            return ResponseEntity.ok(AccountSuccess.TRANSACTION_SUCCESS.toString());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid account details");
        }
    } catch (Exception e) {
        log.error("Error during transaction processing: " + e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transaction failed: " + e.getMessage());
    }
}

    @PostMapping(value = "/Borrow/Money", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "400", description = "Invalid Input or Business Logic Error")
    @ApiResponse(responseCode = "201", description = "Borrow Transaction Successful")
    @SecurityRequirements(@SecurityRequirement(name = "demo-application"))
    public ResponseEntity<String> borrowLoan(@RequestBody BorrowMoneyDTO borrowMoneyDTO, Authentication authentication) {
        try {
            if (borrowMoneyDTO == null || borrowMoneyDTO.getAmount() <= 0) {
                return ResponseEntity.badRequest().body(null);
            }

            String email = authentication.getName();
            Accounts loggedInAccount = accountService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            BankAccount myAccount = bankService.findBankAccountByUser(loggedInAccount)
                    .orElseThrow(() -> new RuntimeException("Bank account not found"));

            int loanAmount = borrowMoneyDTO.getAmount();
            if (loanAmount > 10000) {
                return ResponseEntity.badRequest().body(null);
            }

          borrowMoneyService.borrowMoney(loanAmount, myAccount, borrowMoneyDTO.getDuration());

          return ResponseEntity.ok(AccountSuccess.TRANSACTION_SUCCESS.toString());

        } catch (IllegalArgumentException e) {
            log.warn("Business rule violation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            log.error("Error processing borrow request: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
             
    }


    @PostMapping(value = "/Repay/BorrowedMoney", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "400", description = "Invalid Input or Business Logic Error")
    @ApiResponse(responseCode = "201", description = "Borrow Transaction Successful")
    @SecurityRequirements(@SecurityRequirement(name = "demo-application"))
    public ResponseEntity<String> loanRepay(@RequestBody RepayDTO repayDTO, Authentication authentication) {
        try {
           
            String email = authentication.getName();
            Accounts loggedInAccount = accountService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            BankAccount myAccount = bankService.findBankAccountByUser(loggedInAccount)
                    .orElseThrow(() -> new RuntimeException("Bank account not found"));

              BorrowMoney borrowMoneyAccount = borrowMoneyService.findByBankAccount(myAccount)
              .orElseThrow(() -> new RuntimeException("Borrowed account not found"));  

            int repayAmount = repayDTO.getAmount();
          

          borrowMoneyService.loanRepay(repayAmount, myAccount, borrowMoneyAccount);

           

        } catch (IllegalArgumentException e) {
            log.warn("Business rule violation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            log.error("Error processing borrow request: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
                return null;
    }



    @GetMapping("/history")
    @SecurityRequirement(name = "demo-application")
    public ResponseEntity<List<TransactionsViewDTO>> getTransactionHistory(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    
        try {
            // Get logged-in user's email and bank account
            String email = authentication.getName();
            Accounts loggedInAccount = accountService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
    
            BankAccount myAccount = bankService.findBankAccountByUser(loggedInAccount)
                    .orElseThrow(() -> new RuntimeException("Bank account not found"));
    
            // Fetch transactions where user is either the sender or receiver
            List<BankTransaction> userTransactions = transactionService
                    .findBySenderOrReceiver(myAccount.getAccountNumber());
    
            // Map transactions to DTO (for cleaner response)
            List<TransactionsViewDTO> transactionsDTO = userTransactions.stream()
                    .map(transaction -> new TransactionsViewDTO(
                            transaction.getAmount(),
                            transaction.getSenderAccountNumber(),
                            transaction.getReceiverAccountNumber(),
                            transaction.getTransactionTime()
                    )).toList();
    
            return ResponseEntity.ok(transactionsDTO);
    
        } catch (Exception e) {
            log.error("Error fetching transaction history: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
 






    


