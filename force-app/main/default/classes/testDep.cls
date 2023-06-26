@isTest
    public class testDep {  
        @isTest
        private static void method1(){
                Company__c c = new Company__c();
                c.Name = 'test';
                insert c;
            }   
        }