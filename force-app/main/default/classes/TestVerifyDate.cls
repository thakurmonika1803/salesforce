@isTest
public class TestVerifyDate {
    static testMethod void testMethod1(){
       date d = verifyDate.CheckDates(system.today(), system.today()+1);
       date d1= verifyDate.checkDates(system.today(), system.today()+60);    
    }
}