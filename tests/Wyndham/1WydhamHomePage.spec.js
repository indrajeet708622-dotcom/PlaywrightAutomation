const {test,expect}=require('@Playwright/test');
const {POManagerWyndham}=require("../../Helper/POManagerWyndham");
const testdata=require('../../TestData/WyndhamData.json');


test("Home page Validation,@test",async({page,context}, testinfo) =>{
    

 const pmmm=new POManagerWyndham(page);
 const seeMemberDeals=pmmm.getSeeMemberDeals();
 const joinPage=pmmm.getJoinpage();

 await page.goto(testdata.URL.Wyndham_URL);
 const pagePromise=context.waitForEvent('page');
 await seeMemberDeals.clickOnSeeMemberDeals();
 const newPage=await pagePromise;
 await newPage.waitForLoadState();
 console.log(await newPage.title());
 const pages=context.pages();
  await pages[0].bringToFront();
  await testinfo.attach("title",{body: await newPage.screenshot({fullPage:true}),contentType:"image/png"})
//    await page.pause();
  await pages[1].bringToFront();
 const pmm1=new POManagerWyndham(newPage);
 const pointcal=pmm1.getPointCalculator();
 await pointcal.clickOnPointCalculate();
 await testinfo.attach("title",{body: await newPage.screenshot({fullPage:true}),contentType:"image/png"});
//  await page.pause();

await newPage.close();
 await page.bringToFront();
//  await page.pause();








});
