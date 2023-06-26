trigger AccountTrigger on Account (before insert) {
    if(trigger.isbefore && trigger.isInsert){
        AccountTriggerHandler.CreateAccounts(trigger.new);
    }
}