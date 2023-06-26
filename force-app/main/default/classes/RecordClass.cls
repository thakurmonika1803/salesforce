public class RecordClass {
    @AuraEnabled
    public static List<User> searchList(Boolean active ){
        return[Select Id, Name from User  where isActive =:active];
    }

    

    @AuraEnabled//Method to get the List of All Objects
    public static Map<String, String> getAllObject(){
    
    Map<String,String> ojectAPINameToLabelMap = new Map<String,String>();
    Map<String,String> returnObjectMap = new Map<String,String>();

    //Schema.getGlobalDescribe() => return a Map of type Map<String, Schema.SObjectType>
    Map<String, Schema.SObjectType> globalDescribeMap = Schema.getGlobalDescribe();


    //prepare a Map to send Data from Server to Client Side

    for(String globalDescribeKey : globalDescribeMap.keyset()){
        Schema.SObjectType currentSObjectType = globalDescribeMap.get(globalDescribeKey);
        Schema.DescribeSObjectResult currentSObjectResult = currentSObjectType.getDescribe();
        if(currentSObjectResult.isSearchable() && currentSObjectResult.fields.getMap().containsKey('Name') && currentSObjectResult.fields.getMap().containsKey('CreatedDate') && currentSObjectResult.fields.getMap().containsKey('LastModifiedDate')&& currentSObjectResult.fields.getMap().containsKey('LastModifiedDate') && currentSObjectResult.fields.getMap().containsKey('OwnerId'))
            ojectAPINameToLabelMap.put(currentSObjectResult.getName(), currentSObjectResult.getLabel());
        
       
    }
    return ojectAPINameToLabelMap;
    }


    @AuraEnabled
    public static List<SObject> objList(String selectedSObject,String userId ){
        return Database.query('Select Id,Name,CreatedDate,LastModifiedDate from '+ selectedSObject +' where OwnerId =: userId');
    }

    @AuraEnabled
    public static void reassignRecords(List<SObject> objectList, String userId){
       try{ 
        system.debug(objectList);
        system.debug(userId);
        for(SObject obj : objectList){
            obj.put('OwnerId', userId);
        }
        system.debug(objectList);
        update objectList;
        system.debug(objectList);
       }
    catch(Exception err){
        throw new AuraHandledException(err.getMessage());
    }
 }
}