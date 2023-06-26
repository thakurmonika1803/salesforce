trigger testTrigger on Account (after insert) {
    if(Trigger.isInsert && Trigger.isAfter){
        conClass.insertContact(trigger.new);
    }
}