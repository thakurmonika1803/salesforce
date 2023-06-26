import { LightningElement, api, track } from 'lwc';
import getFieldLabel from '@salesforce/apex/CustomClass.getFieldLabel';
import getsObjectLabel from '@salesforce/apex/CustomClass.getsObjectLabel';
import getObjectsData from '@salesforce/apex/CustomClass.getObjectsData';

export default class Customlookupdemo extends LightningElement {
@api objectApiName;
@api firstFieldApiName;
@api secondFieldApiName;
@api thirdFieldApiName;
@api selectedValue1;
@api selectedValue2;
@api selectedValue3;
@api selectedName1;
@api selectedName2;
@api selectedName3; 
@api firstPickListValues= [];
@api secondPickListValues=[];
@api thirdPickListValues=[];
@track error;
firstFieldLabel=[];
secondFieldLabel=[];
thirdFieldLabel=[];
objectLabel=[];
firstMapValue=[];
secondMapValue=[];
thirdMapValue=[];
showObjectErrorMessage;
showFirstFieldErrorMessage;
showSecondFieldErrorMessage;
showThirdFieldErrorMessage;

connectedCallback() {
  this.getObjectValues();
  // this.getFieldFirstLabel();
  // this.getFieldSecondLabel();
  // this.getFieldThirdLabel();
  // this.fieldOneMap();
  // this.fieldSecondMap();
  // this.fieldThirdMap();
  }

 getObjectValues(){
    getsObjectLabel({objectApiName : this.objectApiName})
    .then((result)=>{
      this.objectLabel = result;
      this.getFieldFirstLabel();
      this.getFieldSecondLabel();
      this.getFieldThirdLabel();
    }).catch((err)=>{
      this.showObjectErrorMessage= 'Object Not found';
    });
  }
getFieldFirstLabel(){
  getFieldLabel({objectApiName : this.objectApiName, fieldApiName : this.firstFieldApiName})
  .then((result)=>{
    this.firstFieldLabel = result;
    this.fieldOneMap();
    }).catch((err)=>{
      this.showFirstFieldErrorMessage= 'First Field Not found';
    })
  }
  getFieldSecondLabel(){
  getFieldLabel({objectApiName : this.objectApiName, fieldApiName : this.secondFieldApiName})
  .then((result)=>{
    this.secondFieldLabel = result;
    this.fieldSecondMap();
    }).catch((err)=>{
      this.showSecondFieldErrorMessage= 'Second Field Not found';
    })
  }
  getFieldThirdLabel(){
  getFieldLabel({objectApiName : this.objectApiName, fieldApiName : this.thirdFieldApiName})
  .then((result)=>{
    this.thirdFieldLabel = result;
    this.fieldThirdMap();
    }).catch((err)=>{
       this.showThirdFieldErrorMessage= 'Third Field Not found';
    })
  }
  fieldOneMap(){
    getObjectsData({objectApiName:this.objectApiName,  fieldApiName:this.firstFieldApiName})
    .then((result)=>{
      this.firstMapValue= result;
    }).catch((err)=>{
      this.showFirstFieldErrorMessage= 'first field is not picklist';
    });
  }
  fieldSecondMap(){
    getObjectsData({objectApiName:this.objectApiName,  fieldApiName:this.secondFieldApiName})
    .then((result)=>{
      this.secondMapValue = result;
    }).catch((err)=>{
      this.showSecondFieldErrorMessage= 'Second field is not picklist';
    });
  }
  fieldThirdMap(){
    getObjectsData({objectApiName:this.objectApiName,  fieldApiName:this.thirdFieldApiName})
    .then((result)=>{
      this.thirdMapValue = result;
    }).catch((err)=>{
      this.showThirdFieldErrorMessage= 'Third field is not picklist';
    });
  }
 
  handleField1OnChange(event){
    var getFirstFieldValues = event.detail.value;
    var conts = this.firstMapValue;
    var listOfFirstFieldValues= [];
    for(var key in conts){
      if(conts[key].toUpperCase().startsWith(getFirstFieldValues.toUpperCase())&& getFirstFieldValues){
        listOfFirstFieldValues.push({value:conts[key], key:key});
      }
    }
    this.firstPickListValues = listOfFirstFieldValues;
  }
  handleField2OnChange(event){
    var getSecondFieldValues = event.detail.value;
    var conts = this.secondMapValue;
    var listOfSecondFieldValues =[];
    for(var key in conts){
      if(conts[key].toUpperCase().startsWith(getSecondFieldValues.toUpperCase()) && getSecondFieldValues){
          listOfSecondFieldValues.push({key: key, value: conts[key]});
      }
    }
     this.secondPickListValues= listOfSecondFieldValues;
  }
  handleField3OnChange(event){
   var getThirdFieldValues = event.detail.value;
   var conts = this.thirdMapValue;
    var listOfThirdFieldValues =[];
    for(var key in conts){
      if(conts[key].toUpperCase().startsWith(getThirdFieldValues.toUpperCase()) && getThirdFieldValues){
          listOfThirdFieldValues.push({key: key, value: conts[key]});
      }
    }
   this.thirdPickListValues= listOfThirdFieldValues;
  }
  handleselectedValue1(event){
    this.selectedValue1 = event.target.dataset.key;  
    this.selectedName1 = event.target.dataset.name;
    this.firstPickListValues=[];
  }
  handleselectedValue2(event){
    this.selectedValue2 = event.target.dataset.key;
    this.selectedName2 = event.target.dataset.name;
    this.secondPickListValues=[];
  }
  handleselectedValue3(event){
    this.selectedValue3 = event.target.dataset.key;
    this.selectedName3 = event.target.dataset.name;
    this.thirdPickListValues=[];
  }  
}