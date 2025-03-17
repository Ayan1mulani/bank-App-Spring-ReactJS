package JavaLearning.hiber.Controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import JavaLearning.hiber.Payload.BankAccountCreateDTO;
import JavaLearning.hiber.Payload.PasswordDTO;
import JavaLearning.hiber.Payload.AccountDTO;
import JavaLearning.hiber.Payload.AllUsersDTO;
import JavaLearning.hiber.Payload.ProfileDTO;
import JavaLearning.hiber.Payload.ProfileDetailDTO;
import JavaLearning.hiber.Payload.TokenDTO;
import JavaLearning.hiber.Payload.UserLoginDTO;
import JavaLearning.hiber.Service.AccountService;
import JavaLearning.hiber.Service.BankService;
import JavaLearning.hiber.Service.TokenService;
import JavaLearning.hiber.models.Accounts;
import JavaLearning.hiber.models.BankAccount;
import JavaLearning.hiber.repository.BankAccountRepo;
import JavaLearning.hiber.util.Constants.AccountError;
import JavaLearning.hiber.util.Constants.AccountSuccess;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "Auth controller", description = "Controller for your auth manager")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private BankService bankService;

    @Autowired
    private BankAccountRepo bankAccountRepo;


 




    @PostMapping("/token")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TokenDTO> token(@Valid @RequestBody UserLoginDTO userLogin) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLogin.getEmail(), userLogin.getPassword()));
            String token = tokenService.generateToken(authentication);
            return ResponseEntity.ok(new TokenDTO(token));
        } catch (Exception e) {
            log.debug(AccountError.TOKEN_GENERATION_ERROR.toString() + " : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new TokenDTO(null));
        }
    }

    @PostMapping(value = "/user/add", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "400", description = "Something went Wrong")
    @ApiResponse(responseCode = "201", description = "AccountAdded")
    public ResponseEntity<String> addUser(@RequestBody AccountDTO accountDTO) {
        try {
            Accounts accounts = new Accounts();
            accounts.setEmail(accountDTO.getEmail());
            accounts.setPassword(accountDTO.getPassword());
            accountService.saveAccount(accounts);
            return ResponseEntity.ok(AccountSuccess.ACCOUNT_ADDED.toString());
        } catch (Exception e) {
            log.debug(AccountError.ADD_ACCOUNT_ERROR.toString() + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

   

    @GetMapping("/Logged/user")
    @SecurityRequirements(@SecurityRequirement(name = "demo-application"))
    public ResponseEntity<ProfileDTO> getProfile(Authentication authentication) {
        if (authentication == null) {
            // Return 401 Unauthorized if no authentication found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        Optional<Accounts> optionalAccount = accountService.findByEmail(email);

        if (optionalAccount.isPresent()) {
            Accounts account = optionalAccount.get();
            ProfileDTO profileDTO = new ProfileDTO(account.getId(), account.getEmail(), account.getAuthority());
            return ResponseEntity.ok(profileDTO);
        }

        // Return 404 Not Found if account is not found
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/Logged/user/details")
    @SecurityRequirements(@SecurityRequirement(name = "demo-application"))
    public ResponseEntity<ProfileDetailDTO> getProfileInfo(Authentication authentication) {
        if (authentication == null) {
            // Return 401 Unauthorized if no authentication found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
 try {
    
 
        String email = authentication.getName();
        Accounts accounts = accountService.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

          BankAccount myAccount = bankService.findBankAccountByUser(accounts)
                    .orElseThrow(() -> new RuntimeException("Bank account not found"));
            ProfileDetailDTO profileDetailDTO = new ProfileDetailDTO();
            profileDetailDTO.setEmail(accounts.getEmail());
            profileDetailDTO.setAccountHolderName(myAccount.getAccountHolderName());
            profileDetailDTO.setAccountNumber(myAccount.getAccountNumber());
            profileDetailDTO.setBorrowedMoney(myAccount.getLoanAmount());
            profileDetailDTO.setTotalBalance(myAccount.getTotalbalance());
            profileDetailDTO.setAdress(myAccount.getAdress());
            profileDetailDTO.setDOB(myAccount.getDOB());
            profileDetailDTO.setGender(myAccount.getGender());
            profileDetailDTO.setOccupation(myAccount.getOccupation());
            profileDetailDTO.setPhoneNo(myAccount.getPhoneNo());
            return ResponseEntity.ok(profileDetailDTO);

        } catch (Exception e) {
            System.out.println(e);
         }
         return null;
        

        // Return 404 Not Found if account is not found
     
    }


    @PostMapping(value = "/Create/Bank/Account", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "400", description = "Invalid Input or Business Logic Error")
    @ApiResponse(responseCode = "201", description = "Borrow Transaction Successful")
    @SecurityRequirements(@SecurityRequirement(name = "demo-application"))
    public ResponseEntity<String> CreateBankAccount(@RequestBody BankAccountCreateDTO AccountCreateDTO, Authentication authentication) {
        try {
           
            String email = authentication.getName();
            Accounts loggedInAccount = accountService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

             BankAccount bankAccount = new BankAccount();
             bankAccount.setAccountHolderName(AccountCreateDTO.getAccountHolderName());
             bankAccount.setAdress(AccountCreateDTO.getAdress());
             bankAccount.setDOB(AccountCreateDTO.getDOB());
             bankAccount.setGender(AccountCreateDTO.getGender());
             bankAccount.setPhoneNo(AccountCreateDTO.getPhoneNo());
             bankAccount.setOccupation(AccountCreateDTO.getOccupation());

             bankAccount.setAccount(loggedInAccount);    
             bankService.SaveBankAccount(bankAccount);  
               
       
           

        } catch (IllegalArgumentException e) {
            log.warn("Business rule violation: {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            log.error("Error processing borrow request: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
                return null;
    }

    @PutMapping(value = "/update/password", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ApiResponse(responseCode = "400", description = "Something went wrong")
    @ApiResponse(responseCode = "200", description = "Password updated successfully")
    @SecurityRequirements(@SecurityRequirement(name = "demo-application"))

    public ResponseEntity<String> updatePassword(@RequestBody @Valid PasswordDTO passwordDTO, Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
            }
    
            // Log the authenticated user
            String email = authentication.getName();
            log.info("Authenticated user: {}", email);
    
            // Retrieve the account
            Accounts loggedInAccount = accountService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
    
            log.info("Found user with email: {}, ID: {}", loggedInAccount.getEmail(), loggedInAccount.getId());
    
            // Check if password is updated
            log.info("Old password: {}", loggedInAccount.getPassword());
            log.info("New password: {}", passwordDTO.getPassword());
    
            // Update and encode password
            loggedInAccount.setPassword(passwordDTO.getPassword());
            accountService.saveAccount(loggedInAccount);
    
            log.info("Password updated successfully for user: {}", loggedInAccount.getEmail());
            
            return ResponseEntity.ok(AccountSuccess.PASSWORD_CHANGED.toString());
    
        } catch (Exception e) {
            log.error("Error updating password: {}", e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something went wrong while updating the password");
        }
    }
    



    @GetMapping("/All/user/details")
    @SecurityRequirements(@SecurityRequirement(name = "demo-application"))
    public ResponseEntity<List<AllUsersDTO>> getAllUsers(Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
    
            String loggedInEmail = authentication.getName(); // Get logged-in user's email
            List<BankAccount> bankAccounts = bankAccountRepo.findAll();
    
            if (bankAccounts.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList()); // Return empty list if no data
            }
    
            List<AllUsersDTO> profileDetails = bankAccounts.stream()
                .filter(myAccount -> !myAccount.getAccount().getEmail().equals(loggedInEmail)) // Exclude logged-in user
                .map(myAccount -> {
                    AllUsersDTO profileDetailDTO = new AllUsersDTO();
                    profileDetailDTO.setEmail(myAccount.getAccount().getEmail());
                    profileDetailDTO.setAccountHolderName(myAccount.getAccountHolderName());
                    profileDetailDTO.setAccountNumber(myAccount.getAccountNumber());
                    profileDetailDTO.setPhoneNo(myAccount.getPhoneNo());
                    return profileDetailDTO;
                })
                .collect(Collectors.toList());
    
            return ResponseEntity.ok(profileDetails);
        } catch (Exception e) {
            System.err.println("❌ Error fetching accounts: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }


}