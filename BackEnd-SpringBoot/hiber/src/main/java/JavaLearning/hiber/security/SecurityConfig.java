package JavaLearning.hiber.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private RSAKey rsaKey;

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        rsaKey = Jwks.generateRsa();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
    }


    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authManager(UserDetailsService userDetailsService) {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(authProvider);
    }


    @Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwks) {
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    JwtDecoder jwtDecoder() throws JOSEException {
         return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http    
            .csrf(csrf -> csrf.disable()) 
            .cors(Customizer.withDefaults()) // Enable CORS
            .authorizeHttpRequests(authz -> authz
                // Permit public access for Swagger endpoints
                .requestMatchers(

                    "/", 
                    "/token", 
                    "/login", 
                    "/auth/token",
                   "/auth/user/add",
                    "/db-console/**",
                    "/swagger-ui/**",     
                    "/v3/api-docs/**"
                ).permitAll()
              
                .requestMatchers("/auth/Users").authenticated()
                .requestMatchers("/auth/All/user/details").permitAll()
                .requestMatchers("/Transaction/Borrow/Money/**").authenticated()
                .requestMatchers("/Transaction/transfer/Money/**" ).authenticated()
                .requestMatchers("/auth/Create/Bank/Account").authenticated()
                .requestMatchers("/auth/update/password").authenticated()
                .requestMatchers("/auth/Logged/user/**").authenticated()
                .requestMatchers("/Transaction/Repay/BorrowedMoney/**").authenticated()
                .anyRequest().authenticated()
                
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()))
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable())) // Allow H2 console in iframes
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    
        return http.build();
    }
}
