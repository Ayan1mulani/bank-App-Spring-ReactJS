package JavaLearning.hiber.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import JavaLearning.hiber.models.BankAccount;
import JavaLearning.hiber.models.BankTransaction;
import JavaLearning.hiber.repository.BankAccountRepo;
import JavaLearning.hiber.repository.TransactionsRepo;

@Service
public class TransactionService {

    private static final Logger log = LoggerFactory.getLogger(TransactionService.class);

    @Autowired
    private TransactionsRepo transactionsRepo;

    @Autowired
    private BankAccountRepo bankAccountRepo;

    /**
     * Sends money from sender to receiver.
     * Performs security checks and uses try-catch to ensure transactional safety.
     *
     * @param senderAccount  The BankAccount of the sender.
     * @param amount         The amount to send.
     * @param reciverAccount The BankAccount of the receiver.
     */
    @Transactional
    public void sentMoney(BankAccount senderAccount, int amount, BankAccount reciverAccount) {
        try {
            if (senderAccount == null || reciverAccount == null) {
                throw new IllegalArgumentException("Sender and receiver accounts must not be null.");
            }
            
            int currentBalance = senderAccount.getTotalbalance();
            
            // Security check: ensure sender has sufficient balance.
            if (currentBalance < amount) {
                throw new IllegalStateException("Insufficient balance");
            }
            
            // Additional security: prevent negative amounts.
            if (amount <= 0) {
                throw new IllegalArgumentException("Amount must be greater than zero.");
            }
            
            // Update balances
            senderAccount.setTotalbalance(currentBalance - amount);
            reciverAccount.setTotalbalance(reciverAccount.getTotalbalance() + amount);
            
            // Save the updated accounts
            bankAccountRepo.save(senderAccount);
            bankAccountRepo.save(reciverAccount);
            
            log.info("Transaction successful: Sent {} from account {} to account {}",
                     amount, senderAccount.getAccountNumber(), reciverAccount.getAccountNumber());
            
        } catch (IllegalArgumentException | IllegalStateException e) {
            log.error("Transaction failed: " + e.getMessage());
            // Rethrow the exception to rollback the transaction if needed
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error during transaction: " + e.getMessage(), e);
            // Optionally, wrap it in a runtime exception and rethrow
            throw new RuntimeException("Transaction failed due to an unexpected error.", e);
        }
    }



    public void saveTransaction(BankTransaction transaction) {
        try {
            if (transaction == null) {
                throw new IllegalArgumentException("Transaction cannot be null.");
            }
            
            if (transaction.getAmount() <= 0) {
                throw new IllegalArgumentException("Transaction amount must be greater than zero.");
            }
            
            if (transaction.getBankAccount() == null) {
                throw new IllegalArgumentException("Transaction must be associated with a valid BankAccount.");
            }
    
            transaction.setTransactionTime(LocalDateTime.now());
         
            transactionsRepo.save(transaction);
            log.info("Transaction saved successfully: {}", transaction);
    
        } catch (Exception e) {
            log.error("Failed to save transaction: " + e.getMessage(), e);
            throw new RuntimeException("Failed to save transaction.", e);
        }
    }


    public List<BankTransaction> findBySenderOrReceiver(Long accountNumber) {
        return transactionsRepo.findBySenderAccountNumberOrReceiverAccountNumber(accountNumber, accountNumber);
    }
 
  
}