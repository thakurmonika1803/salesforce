import { LightningElement} from 'lwc';

export default class Contactdemo extends LightningElement {
disableField = true;  
  fName;
 handleChange(event){
        this.fName = event.target.value;
        if(this.fName != null && this.fName!=''){
            this.disableField = false;
        }
        else{
            this.disableField= true;
        }
     }
    }