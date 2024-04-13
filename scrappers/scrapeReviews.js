const puppeteer = require('puppeteer');
const autoScroll = require("../helpers/autoScroll");
const delay = require('../helpers/delay');



module.exports = getAllReviews = async(url)=>{
  try{
    const browser = await puppeteer.launch({
      headless: 'new'
  })
  const page = await browser.newPage();
  await page.goto(url);


// reviews button 

  await page.evaluate(() => {
    document
      .querySelectorAll('.hh2c6[role="tab"]')[1]
      .classList.add("reviews-button");
  });
  await page.click(".reviews-button");
  await delay(2);
  await autoScroll(
    page,
    'div.m6QErb.WNBkOb[role="main"] .m6QErb.DxyBCb.kA9KIf.dS8AEf'
  );


  const allReviews = await page.evaluate(async () => {
    const delay = (seconds) => {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    };
    const boxSelector = document.querySelector(
      'div.m6QErb.WNBkOb[role="main"] .m6QErb.DxyBCb.kA9KIf.dS8AEf'
    );
    const allReviewsData = [];
    const reviewContainers = document.querySelectorAll(
      ".jftiEf.fontBodyMedium"
    );

    for (let i = 0; i < reviewContainers.length; i++) {
      let userName;
      try {
        userName = reviewContainers[i]
          .querySelector("button.al6Kxe")
          .querySelector(".d4r55")
          .textContent.trim();
      } catch (e) {
        userName = "";
      }
      console.log(userName);
      let userProfileLink;
      try {
        userProfileLink =
          reviewContainers[i].querySelector("button.al6Kxe").dataset.href;
      } catch (e) {
        userProfileLink = "";
      }

      let userRating;
      try {
        userRating = reviewContainers[i]
          .querySelector(".kvMYJc")
          .attributes["aria-label"].value.trim();
      } catch (e) {
        userRating = "";
      }

      let reviewDate;
      try {
        reviewDate = reviewContainers[i]
          .querySelector(".rsqaWe")
          .textContent.trim();
      } catch (e) {
        reviewDate = "";
      }
      let reviewContent;
      try {
        reviewContent = reviewContainers[i]
          .querySelector(".wiI7pd")
          .textContent.trim();
      } catch (e) {
        reviewContent = "";
      }

      allReviewsData.push({
        ["User Name"]: userName,
        ["User Rating"]: userRating,
        ["Profile Link"]: userProfileLink,
        ["Review Date"]: reviewDate,
        ["Review Content"]: reviewContent,
      });
    }

    while (
      boxSelector.offsetHeight + boxSelector.scrollTop <
      boxSelector.scrollHeight
    ) {
      boxSelector.scroll({
        top: boxSelector.scrollHeight + 50,
      });
      //await delay(6);
    }
    return allReviewsData;
  });

  await autoScroll(
    page,
    'div.m6QErb.WNBkOb[role="main"] .m6QErb.DxyBCb.kA9KIf.dS8AEf'
  );
  await delay(3);

  await browser.close()
  return allReviews;

  }catch(e){
    return []
  }

   
}