package JavaLearning.hiber.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import JavaLearning.hiber.models.BankAccount;
import JavaLearning.hiber.models.BorrowMoney;


@Repository
public interface BorrowMoneyRepo extends JpaRepository<BorrowMoney, Long> {
    Optional<BorrowMoney> findByBankAccount(BankAccount bankAccount);
}
