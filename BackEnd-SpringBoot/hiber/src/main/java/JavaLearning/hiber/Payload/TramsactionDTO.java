package JavaLearning.hiber.Payload;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TramsactionDTO {
    @Schema(example = "500")
    private int amount;
    @Schema(example = "123456232")
    private Long reciverAccountID;
    
}
