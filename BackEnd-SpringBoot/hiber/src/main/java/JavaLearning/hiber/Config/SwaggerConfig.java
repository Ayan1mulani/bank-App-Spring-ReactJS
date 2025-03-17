package JavaLearning.hiber.Config;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "User API",
        version = "1.0",
        description = "This API handles user authentication, registration, and profile management.",
        termsOfService = "https://example.com/terms",
        contact = @Contact(
            name = "Ayan",
            email = "Ayan158@gmail.com",
            url = "https://linkedin.com/in/ayan"
        ),
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0"
        )
    )
)
public class SwaggerConfig {
}