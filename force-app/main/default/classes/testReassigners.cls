@isTest
class testReassigners {
    @isTest
    static void getDeactivatedUserReassignTest(){
        reassigners.getDeactivatedUserReassign();
    }
    
    @isTest
    static void getActivatedUsersReassignTest(){    
        reassigners.getActivatedUsersReassign();
    }
    
    @isTest
    static void allObjectsTest(){    
        reassigners.allObjects();  
    }
    
    @isTest
    static void searchRecordsTest(){
        reassigners.searchRecords('Account', userInfo.getUserId());
    }
    
    @isTest
    static void reassignRecordsTest(){    
        List<sObject>recordList = new List<sObject>();
        reassigners.reassignRecords(recordList, userInfo.getUserId());    
    }
}