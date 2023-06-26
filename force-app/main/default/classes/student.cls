public class student {
    public static void UpdateFields(Map<id , student__c> newValues , Map<id, student__c> oldValues){
        
        
        for(id stuId : newValues.keySet()){
            if(oldValues.get(stuId).first_Name__c != newValues.get(stuId).first_Name__c || oldValues.get(stuId).last_name__c != newValues.get(stuId).last_name__c || oldValues.get(stuId).father_name__c != newValues.get(stuId).father_name__c){
                newValues.get(stuId).full_name__c = newValues.get(stuId).first_Name__c+' ' + newValues.get(stuId).father_name__c +' ' + newValues.get(stuId).last_name__c;
            }
        }
        
    }
}