package JavaLearning.hiber.Service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import JavaLearning.hiber.models.Accounts;
import JavaLearning.hiber.models.BankAccount;
import JavaLearning.hiber.repository.BankAccountRepo;

@Service
public class BankService {
    @Autowired
    private BankAccountRepo bankAccountRepo;

    private final Random random = new Random();


    

    public void SaveBankAccount(BankAccount bankAccount){
       

          bankAccount.setLoanAmount(0);
          bankAccount.setTotalbalance(1000);
          // Generate a unique account number
          Long uniqueAccountNumber = generateUniqueAccountNumber();
          bankAccount.setAccountNumber(uniqueAccountNumber);
          bankAccountRepo.save(bankAccount);
        
    }
        // Generate a unique 12-digit account number
        private Long generateUniqueAccountNumber() {
            Long accountNumber;
            do {
                accountNumber = 100000000000L + (long) (random.nextDouble() * 900000000000L); // 12-digit number
            } while (bankAccountRepo.findByAccountNumber(accountNumber).isPresent());
            return accountNumber;
        }




        
    public Optional<BankAccount> findBankAccount (Long accountNumber){
        return bankAccountRepo.findByAccountNumber(accountNumber);
    }

    public Optional<BankAccount> findBankAccountByUser(Accounts account) {
    return bankAccountRepo.findByAccount(account);

}

    public Optional<BankAccount> findByAccountNumber(Long reciverAccountID) {
       return bankAccountRepo.findByAccountNumber(reciverAccountID);
    }

    
}
