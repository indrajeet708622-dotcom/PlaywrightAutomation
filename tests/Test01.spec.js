const {test, expect, chromium} = require('@playwright/test');


test("Verify the title of the page", async ()=> {
test.setTimeout(15*6000);
    const browser=await chromium.launch({
        headless: false
    })

const context=await browser.newContext();
const page=await context.newPage();
 await page.goto("https://www.wyndhamhotels.com/");
const title=await page.title();
// expect(title).toBe("Wyndham Hotels and Resorts | Book Your Hotel Room Today");

const newPage=await context.newPage();  
await newPage.goto("https://www.wyndhamhotels.com/");

const newContext1=await browser.newContext(); 
const newPage1=await newContext1.newPage();
await newPage1.goto("https://www.wyndhamhotels.com/");  
})