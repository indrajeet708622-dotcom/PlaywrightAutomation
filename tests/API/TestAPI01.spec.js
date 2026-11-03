const{test,expect,request}=require('@playwright/test');
const sql=require('mssql');
 require('dotenv').config()


test("API Test",async() =>{


    const apiRequest=await request.newContext();

    const response=await apiRequest.post("End Point URL",{
headers:
{
    'Authorization':`Basic +${Credential}`,
    'Connection':`Keep alive`
}


    })


    const body=await response.json();

    await expect(response.status(),"should be 202").toBe("200");
    const token=body.acces_tocken;


});


test("Use tocken",async() =>{


    const apiRequest=await request.newContext();
    const response=await apiRequest.post("ent POts URL", {

        data:Payload,
        headers: headers


    })

const body=await response.json();


})

test ("Use DB",async() =>{

  await sql.connect(config);

    const result=sql.query('select top App_Number from Submission where AppId=1233');

    const app=result.recordset[0].Appnumber;

})

