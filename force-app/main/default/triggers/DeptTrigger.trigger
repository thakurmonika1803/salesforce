trigger DeptTrigger on Department__c (after insert, before delete) {
    if(trigger.isInsert && trigger.isAfter){
        
        departClass.createdEmployees(trigger.new);
    }
    if(trigger.isDelete && trigger.isBefore){
        departClass.delEmpList(trigger.old);
    }
   
}