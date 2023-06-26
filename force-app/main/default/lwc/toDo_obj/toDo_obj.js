/*import { LightningElement,api,track } from 'lwc';
import ToDoObject from '@salesforce/schema/ToDo__c';
import getUserName from '@salesforce/apex/ToDoClass.getUserName';
import toDoList from '@salesforce/apex/ToDoClass.toDoList';
import { refreshApex } from '@salesforce/apex';
const columns = [
{ label: 'Name', fieldName: 'Name', type:'Text'},
{ label: 'start Time', fieldName:'ToDo_Start_Time__c', type: 'date/Time'},
{ label: 'End Time', fieldName:'ToDo_End_Time__c', type: 'date/Time'},
{ label: 'Description', fieldName:'ToDo_Description__c', type: 'Textarea'},
{ label: 'Dependency', fieldName:'ToDo_Dependency__c', type: 'lookup'}
];
export default class ToDoClass extends LightningElement {
 data = [];
columns = columns;
objectAPIName = ToDoObject;
@api headerLabel = 'ToDo List';
greetings;

connectedCallback() {
    this.getToDoMethod();
    this.getCurrentUserName();
    this.refreshTable();
}

 getToDoMethod(){ 
  toDoList().then((result)=>
   { 
     this.data = result;
   }).catch((err) =>
   {

   });
 }
 handleClick(){
   refreshApex( (result)=>{
       this.refreshTable=result;
   }).catch((err)=>{

   });
}
getCurrentUserName() {
    getUserName()
        .then((result) =>{
       if(new Date().getHours().format() + "." + new Date().getMinutes().format() > 5.0 && new Date().getHours().format() + "." + new Date().getMinutes().format() < 12.0 ){
           this.greetings = "Good Morning "+ result;
       }
 else if(new Date().getHours()+ "." + new Date().getMinutes() > 12.0 && new Date().getHours()+ "." + new Date().getMinutes() < 17.0 ){
           this.greetings = "Good AfterNoon "+ result;
       }
else if(new Date().getHours()+ "." + new Date().getMinutes() > 17.0 && new Date().getHours()+ "." + new Date().getMinutes() < 22.0 ){
           this.greetings = "Good Evening "+ result;
       }
else if(new Date().getHours()+ "." + new Date().getMinutes() > 22.0 && new Date().getHours()+ "." + new Date().getMinutes() < 5.0 ){
           this.greetings = "Greetings"+ result;
       }

   }).catch((err)=> {
       console.log(err);
   });
} 

 @track isModalOpen = false;
    openModal() {
        
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    
    submitDetails() {
        this.isModalOpen = false;
    }
}
*/