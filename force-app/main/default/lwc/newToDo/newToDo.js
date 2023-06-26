import { LightningElement , api ,track , wire } from 'lwc';
import TODO_OBJECT from '@salesforce/schema/ToDo__c';
import getUserName from '@salesforce/apex/ToDoClass.getUserName';
import toDoList from '@salesforce/apex/ToDoClass.toDoList';
import {deleteRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import TIME_ZONE  from '@salesforce/i18n/timeZone';

const actions = [
{label: 'Edit', Name:'Edit'},
{label: 'delete', Name:'delete'}
];

const columns = [
{ label: 'ToDo Name', fieldName: 'Name'},
{ label: 'Start Time', fieldName:'ToDo_Start_Time__c', type: 'date', typeAttributes: {
day: 'numeric',
month: 'short',
year: 'numeric',
hour: '2-digit',
minute: '2-digit',
second: '2-digit',
hour12: true,
}},
{ label: 'End Time', fieldName:'ToDo_End_Time__c', type: 'date', typeAttributes: {
day: "numeric",
month: "short",
year: "numeric",
hour: '2-digit',
minute: '2-digit',
second: '2-digit',
hour12: true,
timeZone: TIME_ZONE
}}, 
{ label: 'Description', fieldName:'ToDo_Description__c'},
{ label: 'Dependency', fieldName:'ToDo_Dependency__c'},
{ label: 'Status', fieldName:'Status__c', cellAttributes:{ class:'.slds-theme_success'}},
{
type:'action',
typeAttributes : {rowActions:actions}
}
];

export default class NewToDo extends LightningElement {

columns = columns;
objectAPIName = TODO_OBJECT;
data = [];
@api openEditPage =  false;
@track isModalOpen = false;
@api recordId;
@track currentRecordEdit = null;
greetings;

connectedCallback() {
this.getToDoMethod();
this.getCurrentUserName();
}

handleEditFormSuccess(){
this.showInfoToast('Record Updated' , 'Record Updated Successfully','success');   
this.submitDetails();
this.getToDoMethod();
this.handleCancel();
}

handleCancel(){
this.openEditPage = false; 
}

showInfoToast(title, message, variant) {
const evt = new ShowToastEvent({
title: title,
message: message,
variant: variant,
mode: 'dismissable'
});
this.dispatchEvent(evt);
}

handleDelete(Id){
deleteRecord(Id)
.then(()=> {
this.showInfoToast('Record Deleted' , 'Record Deleted Successfully','Success');   
this.getToDoMethod();
}).catch((err)=>{
this.showInfoToast('Error!!' , err.body.message , 'error' )
}); 
}

openModal() {
this.isModalOpen = true;
}
closeModal() {
this.isModalOpen = false;
}
submitDetails(){
//this.showInfoToast('Record Created' , 'Record Created Successfully','success');  
this.getToDoMethod();
this.closeModal();
}

getToDoMethod(){ 
toDoList()
.then((results) => {
this.data = results
}).catch((er) => {
    console.log(er);
});
}

getCurrentUserName() {
getUserName()
.then((result) =>{
if(new Date().getHours()+ "." + new Date().getMinutes() > 5.0 && new Date().getHours()+ "." + new Date().getMinutes() < 12.0 ){
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

})
.catch((err)=> {
console.log(err);
});
}

handleRowAction(event){
const actionName = event.detail.action.Name;
const row = event.detail.row;
switch (actionName){
case 'Edit' :
this.openEditPage = true;
this.currentRecordEdit = row.Id
break;
case 'delete' : 
this.handleDelete(row.Id);
break;
default:
}
}
}