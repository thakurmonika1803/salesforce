import { LightningElement, track } from 'lwc';
import searchList from '@salesforce/apex/RecordClass.searchList';
import getAllObject from '@salesforce/apex/RecordClass.getAllObject';
import objList from '@salesforce/apex/RecordClass.objList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import reassignRecords from '@salesforce/apex/RecordClass.reassignRecords';

    const columns = [
        { label: 'Name', fieldName:'Name' },
        { label: 'CreatedDate', fieldName:'CreatedDate' },
        { label: 'LastModifiedDate', fieldName:'LastModifiedDate' },
    ];

    export default class Records_Reassign extends LightningElement {
columns = columns;
data1=[];
data = [];
data2=[];
ActiveUser=[];
selectedUser = '';
selectedRows = [];
selectedObject = '';
selectedActiveUser = '';
@track showModal = false;

disableSearchValue = true;
disableReassignValue = true;

    

connectedCallback() {
    this.getRecordList(); 
    this.getObjects();
}

handleReassignButtonEvent(){
    this.openModal();
    this.getActiveRecordList();

}

handleReassignRecordsEvent(){
    this.reassignRecordsUser();
    this.closeModal();
}

handleUseronchange(event){
    console.log(event.detail.value);
    this.selectedUser = event.detail.value;
    if(this.selectedUser && this.selectedObject){
        this.disableSearchValue = false;   
    }
    else{
        this.disableSearchValue = true;
    }
}

handleObjectonchange(event){
    console.log(event.detail.value);
    this.selectedObject = event.detail.value;
    if(this.selectedObject && this.selectedUser){
        this.disableSearchValue = false;
    }
    else if(this.selectedObject == '')
    {
        this.data = [];
    }
    else{
        this.disableSearchValue = true;
    }

}
handleRowonchange(event){
    this.selectedRows = event.detail.selectedRows;
    if (event.detail.selectedRows.length > 0  ){
        this.disableReassignValue = false;
    }
    else{
         this.disableReassignValue = true;
     }
 }

openModal(){
    // Setting boolean variable to true, this will show the Modal
        this.showModal = true;
    }
closeModal() {
        // Setting boolean variable to false, this will hide the Modal
        this.showModal = false;
        this.selectedActiveUser = '';
    }
    

 getRecordList(){
    searchList({Boolean : false})
        .then((result) => {
            console.log(result);
            var tempdata =[{label:'none',value:''}];
            result.forEach(currentItem => {
                var tempRecord = {};
                tempRecord.label = currentItem.Name;
                tempRecord.value = currentItem.Id;
                tempdata.push(tempRecord);
               console.log(tempdata);
            });
          this.data1 = tempdata;
        }).catch((err) => {
            console.log(err);
        });

    }

    getObjects(){
        getAllObject()
        .then((result) => {
            console.log(result);
            this.data2 = result;
            var arrayList =[{label:'none',value:''}];
            for(let recordObj in result) {
                console.log(recordObj+' '+result[recordObj]);
                var userObj = {};
                userObj.label = result[recordObj];
                userObj.value = recordObj;
                arrayList.push(userObj);
                //console.log(arrayList);
            }
          this.data2 = arrayList;
        }).catch((err) => {
            console.log(err);
        });

        
    }



    getALLData(){
        objList({selectedSObject : this.selectedObject,userId : this.selectedUser})
        .then((result) => {
            this.data = result;
            this.disableSearchValue = true;
            this.template.querySelector('lightning-datatable').selectedRows = [];
            if(result.length == ' '){
                this.showInfoToast('Data is Empty for this Object','Empty','No Data Available');
            }
        }).catch((err) => {
            console.log(err);
            this.showInfoToast('Error!!',error.body.message,'error');
        });
    }

    getActiveRecordList(){
        //console.log('okokokokokoko');
        searchList({active : true})
        .then((result) => {
            //console.log(result);
            var temp =[{label:'none',value:''}];
            result.forEach(currentItem => {
                var testRecord = {};
                testRecord.label = currentItem.Name;
                testRecord.value = currentItem.Id;
                temp.push(testRecord);
               console.log(currentItem);
            });
          this.ActiveUser = temp;
        }).catch((err) => {
            console.log(err);
        });

    }
    
    showInfoToast(title,message,variant) {
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
}

handleActiveUserOnchange(event){
    this.selectedActiveUser = event.detail.value;

}

reassignRecordsUser(){
    reassignRecords({objectList : this.selectedRows, userId : this.selectedActiveUser })
    .then((result) =>{
        this.getALLData();
        this.disableReassignValue = true;

    }).catch((err)=>{
        console.log(err);

    });
}
}