trigger EmpTrigger on Employee__c (before delete) {
    if(trigger.isDelete){
       departClass.delDepList(trigger.new);
    }
}