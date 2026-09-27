const expect=require('@playwright/test')

class HomePage{


    /**
     * @param {import('@playwright/test').Page} page;
     * 
     */

    constructor(page)
    {
        this.page=page;
        this.facebookLink=page.locator("//div[contains(@id,'lets-be-social-container')]//div[contains(@id,'social-media-icon-container')]//div").first();
        this.instaLinked=page.locator("//div[contains(@id,'lets-be-social-container')]//div[contains(@id,'social-media-icon-container')]//div").nth(2);
    }


async clickOnFacebookLink()
{
    await this.facebookLink.click();
}
}

module.exports=HomePage;