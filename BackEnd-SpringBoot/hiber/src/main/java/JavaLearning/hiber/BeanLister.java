// package JavaLearning.hiber;


// import org.springframework.boot.CommandLineRunner;
// import org.springframework.context.ApplicationContext;
// import org.springframework.stereotype.Component;



// // used to print all the beans stored in the context
// @Component
// public class BeanLister implements CommandLineRunner {

//     private final ApplicationContext context;

//     public BeanLister(ApplicationContext context) {
//         this.context = context;
//     }

//     @Override
//     public void run(String... args) {
//         String[] beans = context.getBeanDefinitionNames();
//         for (String bean : beans) {
//             System.out.println("this are the bean ayan"+bean);
//         }
//     }
// }