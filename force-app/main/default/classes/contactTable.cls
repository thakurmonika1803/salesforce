public class contactTable {
@AuraEnabled
public static List<contact> conData(ID accountId){
return [SELECT id, Name, Phone,Email FROM Contact WHERE AccountId =: accountId];
}
}