trigger cmpTrigger on company__c (after insert) {
        if(trigger.isInsert && trigger.isAfter){
            organisations.createDepartments(trigger.new);    
                }   
    }