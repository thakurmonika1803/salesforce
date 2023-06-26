import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import LAST_NAME__C_FIELD from '@salesforce/schema/Contact.lastname';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class RecordFormExample extends LightningElement {
    // Expose a field to make it available in the template
    fields = [NAME_FIELD, LAST_NAME__C_FIELD,EMAIL_FIELD,PHONE_FIELD];

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
}