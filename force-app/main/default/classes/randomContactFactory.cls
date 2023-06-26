public class randomContactFactory {
    public static List<Contact> generateRandomContacts (integer num, string lName ){
             list<Contact> conList = new List<Contact>();
        for(integer i=0;i<num;i++){
        Contact c = new Contact(firstname= lname+' '+i, lastName= 'contacts ' +i);
            conList.add(c);
        }
        system.debug(conList);
        return conList;    
    }
    
}