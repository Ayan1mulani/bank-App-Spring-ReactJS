package JavaLearning.hiber.models;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BankTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Changed to IDENTITY for better DB compatibility
    private Long id;

    private int amount;  

    private Long senderAccountNumber;  
    private Long receiverAccountNumber; 
    private LocalDateTime transactionTime = LocalDateTime.now(); // Automatically sets the time on creation


    @ManyToOne
    @JsonBackReference
    // @JsonManagedReference and @JsonBackReference are used to handle bidirectional relationships and prevent infinite recursion.
	// •	@JsonManagedReference tells Jackson: “This is the parent; serialize it.”
	// •	@JsonBackReference tells Jackson: “This is the child; do NOT serialize it.”
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)  
    private BankAccount bankAccount;    
}