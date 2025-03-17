package JavaLearning.hiber.util.Constants;

public enum Roles {
    USER("ROLE_USER"),ADMIN("ROLE_ADMIN"),EDITIOR("ROLE_EDITIOR");
    
    private String role;
    private Roles(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
