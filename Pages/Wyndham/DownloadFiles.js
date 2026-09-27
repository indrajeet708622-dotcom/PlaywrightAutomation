const expect=require('@playwright/test');


class DownloadFiles{


    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */



    
    constructor(page)
    {
        

        this.page=page;
           }



async downloadAllDocuments (path,Name){
await this.page.locator("//span[text()-$(Name)").click();
const diwnloadPromise =this.page.waitForEvent(`download`);
await this.page.locator("//span[text()='ANZ Application Form V2.pdf").clicl();//click on download link
 const download=await diwnloadPromise; 
 await download.saveAs(`./UploadDocs/${path}/+"ANZApplicationFormV2.pdf`);
 await this.page.locator("//button[contains(@class,'simp-button') and normalize-space()=OK]").click();
}

}

module.exports={DownloadFiles};