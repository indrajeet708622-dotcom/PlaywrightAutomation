const sql = require("mssql"); require('dotenv').config()

require('util').inspect.defaultOptions.maxStringLength = Infinity;

const { test, expect, request } = require('@playwright/test');

const allure = require('allure-playwright').ellure;

const { faker} = require('@faker-js/faker');

const POManagerANZlassic = require('../../../Helper/POManagerANZ_Classic')

const path = require('path');

const folderPath = path.join(process.cwd(), 'XMLFiles');

const filePath1_2 = path.join(folderPath, '26.1_NextDemotcTC04_1.2.xml');

const filePath1_5 = path.join(folderPath, '26.1_NextDemotcTC04_1.5.xml')

const fs = require('fs');

const { assert, Console } = require("console");

const POManagerRLS = require('../../../Helper/POManagerRLS');

const Logindata = require('../../../TestData/LoginURLS.json');

const data = require('../../../TestData/RLS_Data_Repo.json');

const RLSdata = require('../../../TestData/RLS_Data_Repo.json');

import { feature, tag, tms} from "allure-js-commons";

const config = {

server: Buffer.from(process.env.DB_SERVER, 'base64').toString('utf-8'),
 port: 49168, 
 user: Buffer.from(process.env.DB_USER, 'base64').toString('utf-8'),
  password: Buffer.from(process.env.DB_PASSWORD, 'base64').toString('utf-8'),
database: Buffer.from(process.env.DB_DATABASE, 'base64').toString('utf-8'),

options:{

trustedConnection: true,

enableArithAbort: true,

trustServerCertificate: true,

},

};

let token, apicontext, submissionId;

// let orderResponse;

let username =process.env.Basic_Auth_Username

let password =process.env.Basic_Auth_Password

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const credentials = `${username}:${password}`;

const encodedCredentials= Buffer.from(credentials, 'utf-8').toString('base64');



let payloadd

let fName, IName, Email, phoneNum, dateOfBirth, year, day;

let poManager, compage, xmlPage, xml, customerDetails;

let appnumber;



test.describe('Verify that the Agent Managed field is displayed as YES in the RLS Property Asset',async()=>{

test('NG_TC_01_Test API', async () =>{

const authHeader= 'Basic'+ `${encodedCredentials}`;

apiContext =await request.newContext();

const tokenResponse =await apiContext.post("https://iamidentity.federate.qa.service.dev/a",{



headers: {


'Authorization': `Basic ${encodedCredentials}`,

'Connection': 'keep-alive'
}
});
const tokenBody= await tokenResponse.json();
 console.log(tokenResponse.status())

let tok= tokenBody.access_token;

token = tok;

console.log("Token= " + token);
});


test('Extract Submission Id', async ({ page}, testinfo) => {

const poManager = new POManagerRLS(page);

const customerDetails = poManager.getEnterCustomerDetailsPage();

const compage =poManager.getCommonPageLinks();

const Settlementdate = await compage.currentDateOfSettlement()

const tmpi= RLSdata.TPMID.NextGen[0];

const tmpil= RLSdata.TPMID.NextGen [1];

console.log("Settlement Date= + Settlementdate");

fName =faker.person.firstName()

Name =faker.person.lastName();

Email =faker.internet.email({ firstName: fName, lastName: Name });

phoneNum =faker.number.int ({ min: 1000, max: 9999});

year= faker.number.int({ min: 1980, max: 2000})

day =faker.number.int({ min: 10, max: 30})

// dateOfBirth-faker.ye.between({ from: '1990-01-01', to: '2000-01-01'));

console.log("Fname=" + fName + " LName=" + Name + PhoneNum+"phoneNum + Email");

payloadd= `<ApplicationBatch xmlns:wsse="http://schemas.xmlsoap.org/ws/2002/04/secext" xml``

</ApplicationBatch>`

const headers =
{
'Anz-Application-Id': 'Nextgen',

'Accept': 'application/json',

'Authorization': `Bearer ${token}`, 
'X-B3-SpanId': 'efcf4dd20496ee2e69cad1250e68545c',

'X-B3-ParentSpanId': '3837dc3ba8fb342d70abf6454f27390d',

'X-IBM-Client-Id': '6b942d4d-f1ff-4fca-bd40-a6a9436d5fd6',

'X-B3-TraceId': '90b7fe72db29f5e6225ba02770da98a8',

'accept': 'application/xml',

'X-Version': '1.1',

'content-type': 'application/xml',

'Connection': 'keep-alive'
}
apicontext =await request.newContext();

const orderResponse= await apicontext.post("https://sit-lixiapi.homelending",{
     data: payloadd, 
     headers: headers
});
let submissionIdBody =await orderResponse.text(); 
console.log("The status code is " + orderResponse.status());
 console.log(submissionIdBody);
  let value= submissionIdBody.split("<SubmissionID>");
   let subId= value[1].split("</SubmissionID>");
    let id= new String(subId[0]) ;
    let idvalue= id.replace("e", "") ;
    submissionId = idvalue.replace("-", "")

console.log("SubmissionID: ${submissionId}"); // allure.logStep(SubmissionID: ${submissionId}");
})
//checking App number is generated or not

test("NG_TC_01_Database, @NextgenDB", async ({ page }) => {

try {

await sql.connect(config);

for (let i = 0; i <= 35; i++) {
    
await page.waitForTimeout(5000);



let result =await sql.query `select top 1 ApplicationNo
from Submission
where id= ${submissionId}`

try {

const ApplicationNo = result.recordset[0].ApplicationNo;
 console.log(ApplicationNo)
  console.log("Number of iteration under try block" + i); 
  break;

} catch (error) {



console.log("Number of iteration under Catch block" +i);
}
}
}
catch(error){
    console.log(error)
}



//1.2
try {

await sql.connect(config)

const result= await sql.query `select top 1 ApplicationNo

from Submission

where id= ${submissionId}`

const ApplicationNo = result.recordset [0].ApplicationNo;

console.log(ApplicationNo)

// allure.logStep(JSON.stringify(ApplicationNo))

fs.writeFile("XMLFiles/NextGenAppNum.xml", ApplicationNo, (err) => {

if (err) {

console.error('Error writing Application No:', err);

} else {

console.log("Application No saved");
}
});

}

catch (error) {

console.log(error)

}

//1.5 xml extraction

try {

await sql.connect(config)

const result =await sql.query `select top 1 XML_Document

from SubmissionStatus

where SubmissionId= ${submissionId}`

const xmlDocument=result.recordset[0].XML_Document;

// console.log(xmlDocument)

// allure.logStep(JSON.stringify(xmlDocument))

fs.writeFile(filePath1_5, xmlDocument, (err) => {

if (err) {

console.error('Error writing Application No:', err);

} else {

console.log(`Application No saved ${xmlDocument}`);

}

});
}
catch(err)
{
   console.log(err);
}
});


test('MG_TC_01_Nextgen Classic LIXI 1.2 & 1.5', async ({page}, testinfo) => {



test.setTimeout(150000);

const PomanagerANZClassic =new POManagerANZlassic(page);

const menuPage1 =PosanagerANZClassic.getMenuPage();

const appPage1= PomanagerANZClassic.getApplicationPage();

const applicantpage1 =PomanagerAMZClassic.getApplicantsPage();

const LoansPage1= PomanagerANZClassic.getLoansPage();

const Finapage1 =PomanagerANZClassic.getFinanicalPage();

await page.goto(filePathi_2)

await testinfo.attach("x Package Lixi 1.2 Page", {body: await page.screenshot({fullPage: true }), contentType: "image/png"})

//Pckage Lixi 1.2//

await menuPage1.verifyIdentifierUniqueIDTag12("60040-ANZBROKER");

// await menuPage1.verifyLPATagShould Not Diaplay IndiextGen_1_2("7a88cd2-d15b-438e-b306-537d9a5e37cf");

await menuPage1.verifyPrivateteaseAgreementValue_1_2_and_1_5("Agent ManagedLease"); //Pckage Lixi 1.5//

await page.goto(filePathi_5)

await testinfo.attach("X Package Lixi 1.5 Page", {body: await page.screenshot({fullPage: true}), contentType: "image/png"})

await menuPage1.verifyIdentifierUniqueIDTag1_2("60040-ANZTBROKER")

// await menuPage1.verifyLPATagShouldNotoiaplayIndiextGen_1_2("7a8c0d2-d15b-438e-b306-537d9a5e37cf"); await menuPage1.verifyPrivateLeaseAgreementvalue_1_2_and_1_5("AgentManagedLease");
});


// test('MG_TC_01_Nextgen Classic LIXI 1.2 & 1.5', async ({page}, testinfo) => {
test('API to UI Script @NextGenAPIUI', async ({page}, testinfo) =>{
    
    const Appillus =fs.readFileSync("Files/NextGenApps.xml", 'utfa');

potanager =new POManagerRLS(page);

customerDetails =poManager.getEnterCustomerDetailsPage();

compage =portanager.getCommonPagelinks();
});
});