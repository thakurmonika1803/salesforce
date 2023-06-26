trigger newAccount on Account (after insert) {
list<Contact> conList = new List<Contact>();
    for(Account acc:Trigger.new){
        Contact con= new Contact();
        con.FirstName='john';
        con.AccountId=acc.id;
        con.LastName=acc.Name;
      conList.Add(con);
    }
    insert conList;
}