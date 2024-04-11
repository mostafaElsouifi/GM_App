const calcTime = require("../helpers/calcTime");
const scrapeReviews = require("../backend/scrapeReviews");
const createWindow = require('./createWindow');

module.exports = getSomeReviews = async (getSome, data, data_reviews, resultWindow) => {
  const startTime = new Date();
  let indexes = getSome.map((i) => i[0]);

  let win = await createWindow(300,200);
  
  await win.loadFile("./pages/scrapeReviews.html");
  let dataFiltered = data.map((item, i) => {
    if (indexes.includes(i)) {
      return item;
    }
  });
  dataFiltered = dataFiltered.filter((i) => i !== undefined);

  for (let i = 0; i < dataFiltered.length; i++) {
    const reviews = await scrapeReviews(dataFiltered[i]["Map Url"]);
    dataFiltered[i].reviews = reviews;
  }
  win.close();

  const endTime = new Date();
  const timeExecuted = calcTime(startTime, endTime);

  win = await createWindow()
  data_reviews = dataFiltered.filter((d) => d.reviews);
  await win.loadFile("./pages/reviews.html");
  win.webContents.send("reviews-process-time", timeExecuted);
  win.webContents.send("data-reviews", data_reviews);
  resultWindow.webContents.send("reviews-process", "finished");
  return data_reviews;
};
