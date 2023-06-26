import { LightningElement, api, track } from 'lwc';
import getContactData from '@salesforce/apex/TableSearch.getContactData';
const columns = [
{ label: 'fullName', fieldName: 'Name', type:'Text'},
{ label: 'Phone', fieldName: 'Phone', type: 'Text'},
{ label: 'Email', fieldName: 'Email', type: 'Email'}
];
export default class TableSearch extends LightningElement {
  data = [];
columns = columns;
searchKey;
    @track Contact;
    @api headerLabel = 'Contact List';

  handelSearchKey(event){
      this.searchKey = event.target.value;
      if(this.searchKey){
        getContactData({textkey: this.searchKey})
        .then(result => {
                this.Contact = result;
        })
        .catch( error=>{
            this.Contact = null;
        });
      }
      else{
        this.Contact = [];
      }
      
      
  }
}