public class AccountTriggerHandler {
    public static void CreateAccounts(list<Account> accList){
        for(Account acc: accList){
            if(acc.ShippingState != acc.BillingState){
                acc.ShippingState= acc.BillingState;
            }
            
        }
    }
}