trigger stuTrigger on student__c (before update) {
    if(trigger.isUpdate && trigger.isBefore){
        student.UpdateFields(trigger.newMap, trigger.oldMap);
    }
    
}