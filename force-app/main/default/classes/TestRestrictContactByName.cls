@isTest
public class TestRestrictContactByName {
    static testMethod void testContact(){
        list<Contact> conList = new list<Contact>();
        Contact c1 = new Contact(firstName = 'monika', lastName= 'thakur', email='itsmemonika07@gmail.com');
        Contact c2= new Contact(firstName = 'aayushi', lastName= 'INVALIDNAME', email='itsmeaayushi08@gmail.com');
        conList.add(c1);
        conList.add(c2);
        insert conList; 
    }
}