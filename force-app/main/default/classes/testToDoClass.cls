@isTest
class testToDoClass {
    @testSetup
     static void creteSeedData(){
        ToDo__c td = new ToDo__c();
        td.Name = 'muskan jain';
        td.ToDo_Description__c = 'description';
        insert td;
    }   
    @isTest
    static void TestToDo(){
     //TEST.startTest();
     ToDoClass.toDoList();
     //TEST.stopTest(); 
    }
    @isTest
    static void TestgetUserName(){
     //TEST.startTest();
     ToDoClass.getUserName();
     //TEST.stopTest(); 
    }
}