trigger fieldTrigger on Account (after insert){
    accountsFields.contactFields(trigger.new);
   }