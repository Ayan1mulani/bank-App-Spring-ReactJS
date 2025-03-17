package JavaLearning.hiber.Config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import JavaLearning.hiber.Service.AccountService;
import JavaLearning.hiber.Service.BankService;
import JavaLearning.hiber.models.Accounts;
import JavaLearning.hiber.models.BankAccount;
import JavaLearning.hiber.util.Constants.Authority;

// Component is used to mark the class as a spring component
@Component
// CommandLineRunner is an interface used to run the code when the application starts
public class SeedData implements CommandLineRunner{

    @Autowired
    private AccountService accountService;
    @Autowired
    private BankService bankService;
  

    @Override
    // it will run automatically when the application starts
    // String... args is used to pass arguments to the application also zero or more arguments
    public void run(String... args) throws Exception {
      List <Accounts> accounts = accountService.getAllAccounts();
      Accounts account1 = null;
      Accounts account2 = null;

      if(accounts.size() == 0){
         account1 = new Accounts();
         account1.setEmail("AyanMulani158@gmail.com");
         account1.setAuthority(Authority.ADMIN.toString()+" "+Authority.USER.toString());
         account1.setPassword("12511413");
         accountService.saveAccount(account1);



         account2 = new Accounts();
         account2.setEmail("SahilMulanioneplus@gmail.com");
         account1.setAuthority(Authority.USER.toString());
         account2.setPassword("21652165");
         accountService.saveAccount(account2);
      }
       
      
        BankAccount bankAccount1 = new BankAccount();
        bankAccount1.setAccountHolderName("Ayan Mulani");
        bankAccount1.setAdress("Stanza living , tripoli house");
        bankAccount1.setDOB("15/08/2004");
        bankAccount1.setGender("Male");
        bankAccount1.setOccupation("Student");
        bankAccount1.setPhoneNo("+91 8668361520");
        bankAccount1.setAccount(account1);
        bankService.SaveBankAccount(bankAccount1);
        BankAccount bankAccount2 = new BankAccount();
        bankAccount2.setAccountHolderName("Sahil Mulani");
        bankAccount2.setAccount(account2);
        bankAccount2.setPhoneNo("+91 8432165190");
        bankService.SaveBankAccount(bankAccount2);



   
    }
}
