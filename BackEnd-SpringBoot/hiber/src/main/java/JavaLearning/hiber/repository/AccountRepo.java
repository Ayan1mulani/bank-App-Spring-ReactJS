package JavaLearning.hiber.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import JavaLearning.hiber.models.Accounts;


@Repository
public interface AccountRepo  extends JpaRepository<Accounts, Long> 
{
    @Query("SELECT a FROM Accounts a WHERE LOWER(a.email) = LOWER(:email)")
    Optional<Accounts> findByEmail(String email);
}