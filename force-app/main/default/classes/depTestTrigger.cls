@isTest
public class depTestTrigger {
    @isTest
    static void updateMethod(){
        Department__c dep = new Department__c();
        dep.Name = 'dep1';
        dep.Name= 'dep2';
        insert dep; 
    }
    @isTest
    static void deleteMethod(){
        Department__c dep1 = [SELECT id, Name FROM Department__c WHERE Name = 'dep1'];
        update dep1;
        delete dep1;
    }       
}