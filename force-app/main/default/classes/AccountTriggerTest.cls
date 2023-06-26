@isTest
public class AccountTriggerTest {
    @isTest
    private static void accMethod(){
        Account acc = new Account();
        acc.Name= 'john doe';
        acc.BillingPostalCode = '123';
       // acc.ShippingPostalCode= '123';
        insert acc;
    }
}