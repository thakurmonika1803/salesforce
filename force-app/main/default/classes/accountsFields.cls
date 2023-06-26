public class accountsFields {
    public static void contactFields( List<Account> accList){
        List<Contact> conList = new List<Contact>();
        for(Account acc : accList){
            for(string conName : acc.contact_Name__c.split(',')){
                Contact con = new Contact();
                con.LastName = conNAme; 
                con.AccountId = acc.id;    
                conList.add(con);   
            } 
        }
        insert conList;
    }
}