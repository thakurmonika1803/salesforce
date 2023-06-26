trigger CardTrigger on Card__c (after insert , before update) {
    decimal i = 0;
    	List<Id> boardId= new List<Id>();
   		for(Card__c cd : trigger.new){
            boardId.add(cd.board__r.Id);
        }
    List<Card__c> cards = [select id, Name, story_point__c, sprint_story_point__c from Card__c  where board__c  IN : boardId];
    for(Card__c cardList : cards){
        if(cardList.story_point__c != Null){
            i = i + cardList.story_point__c;
        }
        cardList.sprint_story_point__c = i;      
    }
    
}