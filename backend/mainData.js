const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require('uuid');


const selectors = require("./selectors");
const delay = require("../helpers/delay");
const autoScroll = require("../helpers/autoScroll");

const scrapeGM = async(searchTerm, displayScraping, countrySelected, city)=>{
    const browser = await puppeteer.launch({
        headless: displayScraping,
     });
     const page = await browser.newPage();
     await page.goto("https://www.google.com/maps");
     
     const allData = [];
   
     try {
      countrySelected = countrySelected ? `in ${countrySelected}` : '';
      console.log(city)
      city = city ? `in (${city})` : ''
         await page.type(
           selectors.searchInput,
           `${searchTerm} ${countrySelected} ${city}`
         );
   
         await page.click(selectors.searchButton);
         await delay(3);
   
         await autoScroll(page, selectors.resultsBox);
   
         // collect all urls for each section
         const allUrls = await page.evaluate(() => {
           let allUrls = Array.from(document.querySelectorAll("a.hfpxzc"));
           return allUrls.map((url) => url.href);
         });
   
         for (let j = 0; j < allUrls.length; j++) {
           await page.goto(allUrls[j]);
           await delay(1);
           let placeName;
           try {
             placeName = await page.$eval(selectors.placeName, (el) =>
               el.textContent.trim()
             );
           } catch (e) {
             placeName = "";
           }
   
           let rating;
           try {
             rating = await page.$eval(selectors.ratingsNumber, (el) =>
               el.textContent.trim().slice(0, 3)
             );
           } catch (e) {
             rating = "";
           }
   
           let reviewsNumber;
           try {
             reviewsNumber = await page.$eval(
               selectors.ratingsNumber,
               (el) => el.textContent.trim().match(/\(([^)]+)\)/)[1]
             );
           } catch (e) {
             reviewsNumber = "";
           }
   
           let fullAddress;
           try {
             fullAddress = await page.$eval(selectors.fullAddress, (el) =>
               el.textContent.trim()
             );
           } catch (e) {
             fullAddress = "";
           }
   
           let website;
           try {
             website = await page.$eval(selectors.website, (el) => el.href);
           } catch (e) {
             website = "";
           }
   
           let phoneNumber;
           try {
             phoneNumber = await page.evaluate(() => {
               let sections = document.querySelectorAll("button.CsEnBe");
               let phone;
               for (let i = 0; i < sections.length; i++) {
                 if (sections[i].dataset.itemId.includes("phone")) {
                   phone = sections[i].textContent.trim();
                 }
               }
               return phone || "";
             });
           } catch (e) {
             phoneNumber = "";
           }
          // await delay(1);
   
           allData.push({
             ["Map Url"]: allUrls[j],
             ["Place Name"]: placeName,
             ["rating"]: rating,
             ["Number Of Reviews"]: reviewsNumber,
             ["Website"]: website,
             ["Phone Number"]: phoneNumber,
             ["Address"]: fullAddress,
             ['_id'] : uuidv4()
   
           });
         }
     
     } catch (e) {
       console.log(e)
       
     }
     await browser.close()
    
   return allData

}
 
module.exports = scrapeGM;

