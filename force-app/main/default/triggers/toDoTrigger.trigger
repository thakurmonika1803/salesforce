trigger toDoTrigger on ToDo__c (before insert) {
    if(trigger.isInsert && trigger.isBefore){
        ToDoClass.checkStatus(trigger.new);
    }
}