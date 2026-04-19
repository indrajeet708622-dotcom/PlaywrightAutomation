const {expect}=require('@playwright/test')

class JoinPage{

    /**
     * 
     * @param {import ('@playwright/test').Page} page;
     */
constructor(page){
    this.page=page;
    this.joinButton=page.locator('//*[contains(text(),"JOIN NOW")]');
}


async clickonJoinButton(){
    await this.joinButton.click();
}
}
module.exports=JoinPage;