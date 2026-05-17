const {expect}=require('@playwright/test');
const Module = require('node:module');


class PreQualification{

 /**
  * 
  * @param {import ('@playwright/test').Page}page;
  */ 
    constructor(page)
    {
        this.page=page;
       this.preQualification=page.locator("(//*[contains(text(),'Calculate Your Points')])[1]");
    }


    async clickOnPointCalculate()
    {
        await this.preQualification.click();
    }
}
module.exports=PreQualification;