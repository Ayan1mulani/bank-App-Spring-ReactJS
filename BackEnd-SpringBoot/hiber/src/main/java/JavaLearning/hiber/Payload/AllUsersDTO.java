package JavaLearning.hiber.Payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllUsersDTO {
    private String AccountHolderName;
    private Long AccountNumber;
    private String email;
    private String PhoneNo;

    
}
