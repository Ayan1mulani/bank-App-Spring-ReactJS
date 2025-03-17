package JavaLearning.hiber.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BankAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long accountNumber;
    private String accountHolderName;
    private int Totalbalance;
    private int loanAmount;
    private String Occupation;
    private String Adress;
    private String PhoneNo;
    private String Gender;
    private String DOB;



    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Accounts account;

    @OneToMany(mappedBy = "bankAccount")
    @JsonManagedReference
    private List<BankTransaction> transactions;
    

    @OneToMany(mappedBy = "bankAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BorrowMoney> borrowMoney;
    
}