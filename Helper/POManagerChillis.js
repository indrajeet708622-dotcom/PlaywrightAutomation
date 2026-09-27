const {test, expect}=require('@playwright/test');
const HomePage=require('../Pages/Chillis/HomePage');




class POManagerChillis{
    
   

constructor(page)
{
    this.page=page;
    this.HomePage1=new HomePage(this.page);
}

 getFacebook()
{
  return this.HomePage1;
}
}
module.exports={POManagerChillis};