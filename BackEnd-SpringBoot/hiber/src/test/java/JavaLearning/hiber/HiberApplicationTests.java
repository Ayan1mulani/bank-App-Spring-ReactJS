package JavaLearning.hiber;

import org.springframework.boot.test.context.SpringBootTest;
import java.util.UUID;

@SpringBootTest
class HiberApplicationTests {


	public class UUIDExample {
		public static void main(String[] args) {
			UUID uuid = UUID.randomUUID();
			System.out.println("Generated UUID: " + uuid);
		}
	}

}
