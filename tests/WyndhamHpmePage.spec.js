const {test,expect}=require('@playwright/test');
const { POManagerWyndham } = require('../Helper/POManagerWyndham');

test("Verify HomePage",async({page})=>{

    const pm=new POManagerWyndham(page);
    const HomePage1=pm.getHomePage();
    const seeMemberDeals=pm.getSeeMemberDeals();
    const joinPage=pm.getJoinpage();
    //Launch the application
    await page.goto("https://www.wyndhamhotels.com/");
    await HomePage1.enterLocation("New York");
    await HomePage1.getSeeMemberDeals.click();
    await seeMemberDeals.clickOnSeeMemberDeals();
    // await expect(homePage1.signInButton).toBeVisible();
    })

    