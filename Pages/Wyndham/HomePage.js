const expect=require('@playwright/test');

class HomePage{

    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */

constructor(page){
    this.page=page;
    this.signInButton=page.locator('text=Sign In');
    this.signUpButton=page.locator('text=Sign Up');
    this.searchBox=page.locator("//input[@placeholder='Enter destination']");
    this.searchButton=page.locator('#search-button');       
}


async enterLocation(location){
    await this.searchBox.fill(location);
}


}module.exports=HomePage;