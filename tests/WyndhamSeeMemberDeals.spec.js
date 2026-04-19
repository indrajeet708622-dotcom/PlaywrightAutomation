const {test, expect} = require('@playwright/test');
const { POManagerWyndham } = require('../Helper/POManagerWyndham');
const testdata=require('../TestData/WyndhamData.json')




test("verify See Member Deals", async ({page,context},testInfo) =>{

 const pmmm=new POManagerWyndham(page);
 const seeMemberDeals=pmmm.getSeeMemberDeals();
 const joinPage=pmmm.getJoinpage();
 await page.goto(testdata.URL.Wyndham_URL);
 
  const pagePromise=context.waitForEvent('page');
 await seeMemberDeals.clickOnSeeMemberDeals();
 const newPage=await pagePromise;
 await newPage.waitForLoadState();
 console.log(await newPage.title())
 await testInfo.attach("title",{body: await newPage.screenshot({fullpage:true}),contentType:"image/png"});
 await page.pause(); 
 const pm1=new POManagerWyndham(newPage);
 const joinPage1=pm1.getJoinpage();
 const travelBundles=pm1.getTravelBundles();
 await joinPage1.clickonJoinButton();
 await testInfo.attach("JoinPage",{body:await newPage.screenshot({fullpage:true}),contentType:"image/png"}); 
 await travelBundles.clickOnTravelBundles();
 await testInfo.attach("travel page",{body:await newPage.screenshot({fullpage:true}),contentTpe:"image/png"})
 await page.pause();
 
});

 
