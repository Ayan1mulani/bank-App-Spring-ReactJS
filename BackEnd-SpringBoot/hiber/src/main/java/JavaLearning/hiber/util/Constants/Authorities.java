package JavaLearning.hiber.util.Constants;

public enum Authorities {

RESET_ANY_USER_PASSWORD(1l,"RESET_ANY_USER_PASSWORD"),
RESET_ADMIN_PANEL(2l,"ACESS_ADMIN_PANEL");

private Long authorityid;
private String authorityString;

private Authorities(Long authorityid, String authorityString){
    this.authorityid = authorityid;
    this.authorityString = authorityString;

}


public Long getAuthorityID(){
    return authorityid;
}

public String getAuthoruString(){
    return authorityString;
}
    
}