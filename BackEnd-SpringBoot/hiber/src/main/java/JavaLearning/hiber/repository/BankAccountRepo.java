package JavaLearning.hiber.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import JavaLearning.hiber.models.Accounts;
import JavaLearning.hiber.models.BankAccount;


@Repository

    public interface BankAccountRepo extends JpaRepository<BankAccount, Long> {
        Optional<BankAccount> findByAccountNumber(Long accountNumber);
        Optional<BankAccount> findByAccount(Accounts account);
    }
