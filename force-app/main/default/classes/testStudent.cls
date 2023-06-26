@isTest
public class testStudent {
@testSetup
     static void stuMethodTest(){
        student__c stu = new student__c();
         stu.first_Name__c = 'aayushi';
         stu.last_name__c='patel';
         stu.father_name__c='mitesh';
         insert stu;
    }
     @isTest
    static void updateStudent(){
       student__c s =[SELECT first_Name__c, last_Name__c, father_Name__c FROM student__c];
        s.first_Name__c = 'trapti';
        s.last_name__c= 'bhagat';
        s.father_name__c = 'jitesh';
        update s;
    }
}