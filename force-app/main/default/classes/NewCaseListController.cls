public class NewCaseListController {
    public List<Case> getNewCases()
    {
         List<Case> filterList = [SELECT id, CaseNumber from Case where status='New'];
             return filterList;
    }
    
}