package JavaLearning.hiber.models;

import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BorrowMoney {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private long accountid;
    private int borrowedAmount; 
    private int AmountToReturn;
    private int AmountPaidTillNow;
    private double interestRate; 
    private int MonthlyPayment;
    private int duration; 
    private LocalDate date;

  
 @ManyToOne
@JsonBackReference
@JoinColumn(name = "bank_account_id", referencedColumnName = "id", nullable = false)
private BankAccount bankAccount;


   
}