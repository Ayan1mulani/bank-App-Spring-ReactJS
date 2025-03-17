package JavaLearning.hiber.models;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.OneToOne;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Accounts {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
    private String email;
    private String password;
    private LocalDateTime createDateTime;
    private String Authority;
   
    public Accounts( String UserName, String email, String password) {
    
        this.email = email;
        this.password = password;
    }


    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private BankAccount bankAccount;

      
}
