import { LightningElement,api,track } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

import recordMethod from '@salesforce/apex/contactTable.conData';
//import{CONTACT_OBJECT} from '@salesforce/schema/Contact';

const columns = [
  { label: 'fullName', fieldName: 'Name', type:'Text'},
  { label: 'Phone', fieldName: 'Phone', type: 'Text'},
  { label: 'Email', fieldName: 'Email', type: 'Email'}
];


export default class contactTable extends LightningElement {
  data = [];
  columns = columns;
  // objectAPIName= CONTACT_OBJECT;
  @api headerLabel = 'Contact List';
  @api recordId;

  connectedCallback() {
    recordMethod({AccountId: this.recordId})
    .then((result) => {
      this.data= result
    }).catch((err) => {
      
    });
    }


     @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    /*
    submitDetails() {
        this.isModalOpen = false;
    }
    */
    
        objectAPIName = CONTACT_OBJECT;

}