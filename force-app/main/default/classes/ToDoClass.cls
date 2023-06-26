public class ToDoClass {
   @AuraEnabled
  public static String getUserName() {
    return userinfo.getName();
  }
  @AuraEnabled
  public static List<ToDo__c> toDoList(){
    return [select Id,OwnerId, Name, ToDo_End_Time__c, ToDo_Description__c, ToDo_Dependency__c, ToDo_Start_Time__c,Status__c FROM ToDo__c where OwnerId =: UserInfo.getUserId()];
  }

  @AuraEnabled
  public static void checkStatus(List<ToDo__c>tdList){
    for(ToDo__c td : tdList){
      if( td.ToDo_Start_Time__c == system.now()){
        td.Status__c = 'Started';
      }
    }
  }
}



    /*@AuraEnabled
    public static void handleStartTime(List <ToDo__c> tdList){
        for(ToDo__c td : tdList){
            td.ToDo_Start_Time__c = system.now();
        }
    }
    */