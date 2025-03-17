package JavaLearning.hiber.Service;

import java.time.LocalDate;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import JavaLearning.hiber.models.BankAccount;
import JavaLearning.hiber.models.BorrowMoney;
import JavaLearning.hiber.repository.BankAccountRepo;
import JavaLearning.hiber.repository.BorrowMoneyRepo;

@Service
public class BorrowMoneyService {

    private static final Logger logger = LoggerFactory.getLogger(BorrowMoneyService.class);

    @Autowired
    private BankAccountRepo bankAccountRepo;

    @Autowired
    private BorrowMoneyRepo borrowMoneyRepo;

    @Transactional
    public BorrowMoney borrowMoney(int amount, BankAccount bankAccount, int duration) {
        if (bankAccount == null) {
            throw new IllegalArgumentException("Bank account cannot be null");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }
        if (amount >= 10000) {
            throw new IllegalArgumentException("Borrowing amount must be less than 10000");
        }
        if (duration != 3 && duration != 6 && duration != 12) {
            throw new IllegalArgumentException("Duration must be 3, 6, or 12 months");
        }

      
    

        // Calculate total amount to return with interest
        double interest = (amount * 9 * duration) / 1200.0; // Annual interest prorated for months
        int amountToReturn = amount + (int) Math.round(interest);
    
        // Calculate minimum monthly payment
        int monthlyPayment = amountToReturn / duration;
          // Update BankAccount
         bankAccount.setTotalbalance(bankAccount.getTotalbalance() + amount);
        bankAccount.setLoanAmount(bankAccount.getLoanAmount() + amountToReturn);
    

        // Create BorrowMoney Entry
        BorrowMoney borrowMoney = new BorrowMoney();

        borrowMoney.setBorrowedAmount(amount);
        borrowMoney.setInterestRate(9.5);
        borrowMoney.setDuration(duration);
        borrowMoney.setDate(LocalDate.now());
        borrowMoney.setBankAccount(bankAccount);
        borrowMoney.setAmountToReturn(amountToReturn);
        borrowMoney.setMonthlyPayment(monthlyPayment);
   

        
        // Ensure accountId is set (if required)
        borrowMoney.setAccountid(bankAccount.getAccountNumber());


        // Save both in a transaction
        bankAccountRepo.save(bankAccount);
        BorrowMoney savedBorrowMoney = borrowMoneyRepo.save(borrowMoney);

        logger.info("Borrow transaction completed successfully.");
        return savedBorrowMoney;
    }


    @Transactional
    public void loanRepay(int amount, BankAccount bankAccount , BorrowMoney borrowMoney) {

        if (bankAccount == null) {
            throw new IllegalArgumentException("Bank account cannot be null");
        }

        if (amount <= 0) {
            throw new IllegalArgumentException("Repayment amount must be greater than zero");
        }

        if (bankAccount.getLoanAmount() <= 0) {
            throw new IllegalArgumentException("No outstanding loan to repay");
        }

        if (amount > bankAccount.getLoanAmount()) {
            throw new IllegalArgumentException("Repayment amount cannot exceed the outstanding loan");
        }

        if (amount > bankAccount.getTotalbalance()) {
            throw new IllegalArgumentException("Insufficient balance to repay the loan");
        }
    

        // Process loan repayment
        bankAccount.setTotalbalance(bankAccount.getTotalbalance() - amount);
        bankAccount.setLoanAmount(bankAccount.getLoanAmount() - amount);
        borrowMoney.setAmountToReturn(borrowMoney.getAmountToReturn() - amount);
        borrowMoney.setAmountPaidTillNow(amount);
        borrowMoney.setMonthlyPayment(amount);



        // Save updated account information
        bankAccountRepo.save(bankAccount);
        borrowMoneyRepo.save(borrowMoney);

        logger.info("Loan repayment of {} completed successfully for account: {}", amount, bankAccount.getId());

        if (bankAccount.getLoanAmount() == 0) {
            logger.info("Loan fully repaid for account: {}", bankAccount.getId());
        }
    }



       public Optional<BorrowMoney> findByBankAccount(BankAccount bankAccount) {
       return borrowMoneyRepo.findByBankAccount(bankAccount);

}
}