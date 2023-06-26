@isTest
public class recordtestclass {
    @isTest
    static void searchListTest(){
        RecordClass.searchList(true);       
    }
    @isTest
    static void getAllObjectTest(){
        RecordClass.getAllObject();        
    }
    @isTest
    static void objListTest(){
        RecordClass.objList('Contact',userinfo.getUserName());
    }
    @isTest
    static void reassignRecordTest(){
        List<Contact> conList = new List<Contact>();
        RecordClass.reassignRecords(ConList,userinfo.getUserName());
    }

}