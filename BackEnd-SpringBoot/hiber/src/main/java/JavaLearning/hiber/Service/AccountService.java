package JavaLearning.hiber.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import JavaLearning.hiber.models.Accounts;
import JavaLearning.hiber.repository.AccountRepo;
import JavaLearning.hiber.util.Constants.Authority;

@Service
public class AccountService implements UserDetailsService {
    private final AccountRepo accountRepo;
    private final PasswordEncoder passwordEncoder;

    public AccountService(AccountRepo accountRepo, PasswordEncoder passwordEncoder) {
        this.accountRepo = accountRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Accounts> getByID(long ID) {
        return accountRepo.findById(ID);
    }

    public Optional<Accounts> findByEmail(String email) {
        return accountRepo.findByEmail(email);
    }

    public List<Accounts> getAllAccounts() {
        List<Accounts> accounts = accountRepo.findAll();
        return accounts;
    }

    public void deleteAccount(long ID) {
        accountRepo.deleteById(ID);
    }

    public void saveAccount(Accounts account) {
        account.setCreateDateTime(LocalDateTime.now());
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        if (account.getAuthority() == null)  {
            account.setAuthority(Authority.USER.toString());
        }

        accountRepo.save(account);
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Accounts accounts = accountRepo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Account Not Found: " + email));
    
        System.out.println("User found: " + accounts.getEmail());
    
        return new User(accounts.getEmail(), accounts.getPassword(), List.of(new SimpleGrantedAuthority(accounts.getAuthority())));
    }
}