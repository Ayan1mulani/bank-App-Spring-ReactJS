package JavaLearning.hiber;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.enums.*;
import io.swagger.v3.oas.annotations.security.SecurityScheme;





// @Configuration
// @EnableAutoConfiguration
// @ComponentScan
// instead of using this three annotation we can use combine of this annotation
@SpringBootApplication
@SecurityScheme(name = "demo-application", scheme = "bearer", type = SecuritySchemeType.HTTP, in= SecuritySchemeIn.HEADER)

public class HiberApplication {
	public static void main(String[] args) {
		SpringApplication.run(HiberApplication.class, args);
	}

}
