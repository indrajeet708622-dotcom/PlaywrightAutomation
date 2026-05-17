const HomePage=require('../Pages/Wyndham/HomePage');
// const eeMemberDeals=require('../pages/Wyndham/SeeMemberDeals');
const SeeMemberDeals=require('../Pages/Wyndham/SeeMemberDeals');
const JoinPage=require('../Pages/Wyndham/JoinPage')
const TravelBundles=require('../Pages/Wyndham/TravelBundles');  
const PreQualification=require('../Pages/Wyndham/PreQualification')

class POManagerWyndham{


    constructor(page){
        this.page=page;
        this.HomePage=new HomePage(this.page);
        this.SeeMemberDeals = new SeeMemberDeals(this.page);
        this.JoinPage=new JoinPage(this.page);
        this.TravelBundles=new TravelBundles(this.page);
        this.PreQualification=new PreQualification(page);
        }

        getHomePage(){
            return this.HomePage;
        }

        getSeeMemberDeals(){
            return this.SeeMemberDeals;
        }
 getJoinpage(){
    return this.JoinPage
 }

 getTravelBundles(){
  return this.TravelBundles;
 }

 getPointCalculator()
 {
    return this.PreQualification;
 }
}

module.exports={POManagerWyndham};