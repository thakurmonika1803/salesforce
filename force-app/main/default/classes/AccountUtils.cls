public class AccountUtils {
    public static list<Account> accountsByState(string state){
        list<Account> acclist =[select ID ,name from Account where BillingState=:state];
        return acclist;
    }
}