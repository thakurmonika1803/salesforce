public class reassigners {
    @AuraEnabled
    public static List<User> getDeactivatedUserReassign(){
        return [ select Id, Name from User where IsActive = false ];
    }
    
    @AuraEnabled
    public static List<User> getActivatedUsersReassign(){        
        return[select Id, Name from User where IsActive = true];
    }
    
    @AuraEnabled
    public static Map<String, String>allObjects (){
        try {
            Map<String, String> objectAPINameToLabelMap = new Map<String, String>();
            Map<String, Schema.SObjectType> globalDescribeMap = Schema.getGlobalDescribe();    
            for(String globalDescribeKey : globalDescribeMap.keySet()) {
                Schema.SObjectType currentSObjectType = globalDescribeMap.get(globalDescribeKey);
                Schema.DescribeSObjectResult currentSObjectResult = currentSObjectType.getDescribe();
                if (currentSObjectResult.fields.getMap().containsKey('OwnerId') && currentSObjectResult.fields.getMap().containsKey('Name') && currentSObjectResult.fields.getMap().containsKey('CreatedDate') && currentSObjectResult.fields.getMap().containsKey('LastModifiedDate') && currentSObjectResult.isSearchable()) {
                    objectAPINameToLabelMap.put(currentSObjectResult.getName(), currentSObjectResult.getLabel());
                }  
            }
            return objectAPINameToLabelMap;
        }catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }  
        
    }
    
    @AuraEnabled
    public static List<sObject> searchRecords(String sObjectApiName, String userId ){
        return Database.query('select Id, Name, CreatedDate, LastModifiedDate from ' + sObjectApiName + ' where  OwnerId = \''+userId+'\'');  
    }
    
    @AuraEnabled
    public static void reassignRecords(List<sObject> recordList, String userId){
        try {
            for(sObject record : recordList){
                record.put('OwnerId', userId);
            }
            update recordList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}