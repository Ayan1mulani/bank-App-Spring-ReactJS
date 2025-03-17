package JavaLearning.hiber.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import JavaLearning.hiber.models.BankTransaction;

@Repository
public interface TransactionsRepo extends JpaRepository<BankTransaction, Long> {
    List<BankTransaction> findBySenderAccountNumberOrReceiverAccountNumber(Long senderAccountNumber, Long receiverAccountNumber);
}