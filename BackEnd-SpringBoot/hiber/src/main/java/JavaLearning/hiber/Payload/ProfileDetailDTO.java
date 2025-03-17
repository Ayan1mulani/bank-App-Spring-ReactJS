package JavaLearning.hiber.Payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDetailDTO {
    private String AccountHolderName;
    private String UserName;
    private Long AccountNumber;
    private String email;
    private int TotalBalance;
    private int BorrowedMoney;
    private String Occupation;
    private String Adress;
    private String PhoneNo;
    private String Gender;
    private String DOB;


}
