trigger ContactInsertUpdateInfo on Contact (before insert, after update) {
for(Contact c: trigger.new)
{
   if(trigger.isInsert){
   c.description='contact insert successfully ';
    }
   else if(trigger.isUpdate){
   c.description='contact update successfully';
 
   }
}
}