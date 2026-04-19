const {expect}= require('@playwright/test');


class SeeMemberDeals{

 /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
   
    constructor(page){
        this.page=page;
        this.dealMemeber=page.locator("(//*[contains(text(),'SEE MEMBER DEALS')])[1]");
    }

    async clickOnSeeMemberDeals(){
        await this.dealMemeber.click();
    }


}
module.exports=SeeMemberDeals;