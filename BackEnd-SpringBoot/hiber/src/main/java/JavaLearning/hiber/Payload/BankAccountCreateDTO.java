package JavaLearning.hiber.Payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankAccountCreateDTO {
    private String AccountHolderName;   
    private String Occupation;
    private String Adress;
    private String PhoneNo;
    private String Gender;
    private String DOB;

}
