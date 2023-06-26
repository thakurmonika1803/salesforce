import { LightningElement, track } from 'lwc';
import getDeactivatedUserReassign from '@salesforce/apex/reassigners.getDeactivatedUserReassign';
import getActivatedUsersReassign from '@salesforce/apex/reassigners.getActivatedUsersReassign';
import allObjects from '@salesforce/apex/reassigners.allObjects';
import searchRecords from '@salesforce/apex/reassigners.searchRecords';
import reassignRecords from '@salesforce/apex/reassigners.reassignRecords';
import User from '@salesforce/schema/User';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


 const columns = [
   { label: 'Name', fieldName: 'Name'},
   { label: 'CreatedDate', fieldName: 'CreatedDate'},
   { label: 'LastModifiedDate ', fieldName: 'LastModifiedDate'}
 ];

export default class RecordsReassigners extends LightningElement {

fetchedRecords = [];
deactivatedUsers = [];
activatedUsers = [];
allSobjects = [];
displayobjRecords = [];
columns = columns;
objectAPIName = User;
disableSearchButton = true; 
disableReassignButton = true;
disableActReassign = true;
selectUser = '';
selectSobject = '';
selectActUser = '';
selectedRows = [];
@track spinnerStatus = false;
@track isModalOpen = false;
                                                                                                                                                  
connectedCallback() {
   this.deactivatedUserInfo();
   this.activatedUserInfo();
   this.getObjectName();
}

openModal() {
this.isModalOpen = true;
}
closeModal() {
this.disableActReassign = true;
this.isModalOpen = false;
}

handleDectUserChange(event) {
    this.selectUser = event.detail.value;
    if(this.selectUser != '' && this.selectSobject != '' ){
    this.disableSearchButton = false;
  }
  else{
   this.disableSearchButton= true;
  }
}
handlesObjChange(event) {
    this.selectSobject = event.detail.value;
    if(this.selectSobject != '' && this.selectUser != ''){
    this.disableSearchButton = false;
  }
  else if(this.selectSobject == '') 
  {
    this.fetchedRecords = [];
    this.disableSearchButton = true;
  }
  else{
    this.disableSearchButton = true;
  }
}
handleChangeOnReassign(event){
  this.selectedRows = event.detail.selectedRows;
  if(this.selectedRows.length != ''){
    this.disableReassignButton = false;
  }
  else{
    this.disableReassignButton = true;
  }
}
handleActUserChange(event) {
  this.selectActUser = event.detail.value;
  if(this.selectActUser != ''){
    this.disableActReassign = false;
  }
  else{
    this.disableActReassign = true;
  }
}
handleShowSpinner(){
  this.spinnerStatus = true;
}
handleHideSpinner(){
  this.spinnerStatus = false;
}

showNotification(title , message, variant ) {
  const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
  });
  this.dispatchEvent(evt);
}

deactivatedUserInfo(){
  getDeactivatedUserReassign()
  .then((result) => {
    this.deactivatedUsers= result;
    var tempData = [{label: 'None', value: ''}];
    result.forEach(currentItem => {
    var tempUser = {};
    tempUser.label = currentItem.Name;
    tempUser.value = currentItem.Id;
    tempData.push(tempUser);
      });
  this.deactivatedUsers = tempData;
  }).catch((err) => {
    this.showNotification('Warning', err, 'error');
  });
}
 activatedUserInfo(){
  getActivatedUsersReassign()
  .then((result) => {
  this.activatedUsers= result;
  var tempData = [{label: 'None', value: ''}];
  result.forEach(currentItem => {
  var tempUser = {};
  tempUser.label = currentItem.Name;
  tempUser.value = currentItem.Id;
  tempData.push(tempUser);
  });
 this.activatedUsers = tempData;
  }).catch((err) => {
    this.showNotification('Warning', err, 'error');
  });
 }
getObjectName(){
  allObjects()
    .then((result)=>{
      this.allSobjects = result;
      var arrayList = [{label: 'None', value: ''}];
      for(let recordObj in result){
      var userObj = {};
      userObj.label = result[recordObj];
      userObj.value= recordObj;
      arrayList.push(userObj);
      }
      this.allSobjects = arrayList;
      }).catch((err)=>{
        this.showNotification('Warning', err, 'error');
  })
}
getSearchUser(){  
  this.handleShowSpinner();
  searchRecords({sObjectApiName : this.selectSobject , userId : this.selectUser})
    .then((result) => {
      if(result.length > 0){
      this.fetchedRecords = result; 
      this.handleHideSpinner();
      this.template.querySelector('lightning-datatable').selectedRows = [];
      this.disableSearchButton = true;
      this.disableReassignButton = true;
    } 
    else{
      this.handleHideSpinner();
      this.showNotification('Warning', 'No record found for selected User', 'error');
      this.fetchedRecords = [];
    }
    }).catch((err) =>{
      this.showNotification('Warning', err, 'error');
    })     
   }  
getReassignActUser(){
reassignRecords({recordList : this.selectedRows, userId : this.selectActUser})
  .then((result) =>{
    this.handleShowSpinner();
    this.closeModal();
    this.handleHideSpinner();
    this.showNotification('Success', 'Record Reassigned', 'Success');
    this.getSearchUser();
    this.fetchedRecords = [];
    }).catch((err)=>{
      this.showNotification('Warning', err, 'error');
    })
 }
}