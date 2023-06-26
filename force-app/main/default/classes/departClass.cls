public class departClass {
    public static void createdEmployees(List<Department__c> depList){
        List<Employee__c> EmpList = new List<Employee__c>();
        for(Department__c de : depList){
            for(integer i=1;i<=5;i++)
            {
                Employee__c emp = new Employee__c();
                emp.Name = 'employee '+i;
                emp.Department__c = de.id;
                EmpList.add(emp);
            }
        }
        insert EmpList;
    }
    public static void delEmpList(List<Department__c> dept){
        delete [SELECT id FROM employee__c WHERE department__c in:dept];
    }
      public static void delDepList(List<Employee__c> emps){
          List<Department__c> dep2 = new List<Department__c>();
          for(employee__c  e : emps){
              dep2.add(new Department__c(id = e.Department__c));
          }
          Integer countList = [SELECT count() from employee__c WHERE Department__c IN : dep2 AND id not in: emps];
          if(countList==0){
              delete Dep2;
          }
     }
    
}