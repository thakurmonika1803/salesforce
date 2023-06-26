public class conClass {
    public static void insertContact(list<Account> accList){
        list<Contact>conList= new List<Contact>();
        for(Account acc:accList){
            for(integer i=1;i<=2;i++){
                contact c = new contact();
                c.firstName='john'+i;
                c.LastName='doe';
                c.AccountId=acc.Id;
                conList.add(c);
            }
            system.debug(conList);
        }
        insert conList;
    }
}