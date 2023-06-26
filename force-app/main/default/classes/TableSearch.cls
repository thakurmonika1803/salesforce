public class TableSearch {
 @AuraEnabled(Cacheable = true)
    public static list<Contact> getContactData(String textkey ) {
        textkey = textkey + '%';
        list<Contact> ConLst = [SELECT ID, Name, Phone, Email From Contact WHERE Name LIKE :textkey];
        
        if(ConLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return ConLst; 
    }
}