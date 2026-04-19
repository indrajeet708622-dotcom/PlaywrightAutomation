const {expect}=require('@playwright/test');



class TravelBundles{
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){

        this.page=page;
        this.travelBundles=page.locator('//*[contains(text(),"Travel Bundles")]');
    }

    async clickOnTravelBundles(){
        await this.travelBundles.click();
        // await this.page.getByRole('heading',{name:"Travel Bundles"}).click();
    }
}
module.exports=TravelBundles;