const {test,expect}=require('@playwright/test')
const {POManagerChillis}=require("../../../Helper/POManagerChillis");
const testdata=require('../../../TestData/ChillisData.json');


test("Verify Chillis Home Page,@",async({page,context}, testinfo)=>{
 const pmmm=new POManagerChillis(page);
 const Facebook=pmmm.getFacebook();

 await page.goto("https://chilis.com");
 
 const pagePromise=context.waitForEvent(page);
 await Facebook.clickOnFacebookLink();
 await testinfo.attach("title of page",{body:await page.screenshot({fullPage:true}),contentType:"image/png"})
 const nePage=await pagePromise;

 const pm=new POManagerChillis(newPage);
 const facebook1=pm.getFacebook();
 await testinfo.attach("page title",{body:await newPage.screenshot({fullPage:true}),contentType:image/png})
 await page.pause();
 //await testinfo.attach("title",{body: await newPage.screenshot({fullPage:true}),contentType:"image/png"})
})