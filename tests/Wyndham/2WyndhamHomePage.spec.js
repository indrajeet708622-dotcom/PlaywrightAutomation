const {test,expect}=require('@playwright/test');
const {POManagerWyndham }=require("../../Helper/POManagerWyndham");
const testData=require("../../TestData/WyndhamData.json")



test("Test data file,@test",async({page,context},testinfo)=>{

const pm=new POManagerWyndham(page);
const SeeMemberDeals=pm.getSeeMemberDeals();
const joinPage=pm.getHomePage();


await page.goto(testData.URL.Wyndham_URL);
const pagePromise=context.waitForEvent('page');
await SeeMemberDeals.clickOnSeeMemberDeals();
const newPage=await pagePromise;

const pm1=new POManagerWyndham(newPage);

const pages=context.pages();
await pages[1].bringToFront();
await pages[0].bringToFront();
const pointCal=pm1.getPointCalculator();
await pointCal.preQualification();

await testinfo.attach("title",{body: await newPage.screenshot({fullPage:true}),contentType:'image/PNg'})
// await expect.soft(pointCal,"to be truthy").toBeFalsy();







})