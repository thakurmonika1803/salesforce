import { LightningElement, api } from 'lwc';
export default class CustomLookup extends LightningElement {
@api objectApiName;
@api firstFieldApiName;
@api secondFieldApiName;
@api thirdFieldApiName;
}