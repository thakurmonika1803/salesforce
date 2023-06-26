public class CustomClass {
 @AuraEnabled
    public static String getFieldLabel( String objectApiName, String fieldApiName){
        try {
            return schema.getglobaldescribe().get(objectApiName).getDescribe().fields.getMap().get(fieldApiName).getDescribe().getLabel();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static String getsObjectLabel(String objectApiName){
        try {
            return schema.getglobaldescribe().get(objectApiName).getdescribe().getLabel();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static map<String, String> getObjectsData(String objectApiName, String fieldApiName){
        try {
            if(String.valueOf(schema.getglobaldescribe().get(objectApiName).getDescribe().fields.getMap().get(fieldApiName).getDescribe().getType()) != 'PICKLIST'){
                throw new AuraHandledException('Given Field is not Picklist');
            }
            Map<String, String> pickValLabel = new Map<String, String>();
            for(Schema.PicklistEntry pickListVal : schema.getglobaldescribe().get(objectApiName).getDescribe().fields.getMap().get(fieldApiName).getDescribe().getPicklistValues()){
            if(pickListVal.isActive()){
                pickValLabel.put(pickListVal.getValue(),pickListVal.getLabel());
                }
            }    
            return pickValLabel;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
}