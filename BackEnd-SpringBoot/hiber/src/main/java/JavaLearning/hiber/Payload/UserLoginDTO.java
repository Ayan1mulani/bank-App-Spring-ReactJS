package JavaLearning.hiber.Payload;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;

public class UserLoginDTO {
   
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Email
    @Schema(example = "AyanMulani158@gmail.com")
    private String email;
    @Schema(example = "12511413")

    private String password;
}
