public class organisations {
    public static void createDepartments(List<Company__c> cmp){
        List<Department__c> depts = new List<Department__c>();
        for(Company__c cmpList: cmp){
            for(integer i=1;i<=5;i++){
                Department__c dep = new Department__c(); 
                dep.Name = 'department'+i;
                dep.Company__c = cmpList.id; 
                depts.add(dep);
            }
        }
        insert depts;
    }
}