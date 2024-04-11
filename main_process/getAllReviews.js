const { app, BrowserWindow, ipcMain } = require("electron");
const createWindow = require('./createWindow');
const scrapeReviews = require('../backend/scrapeReviews');
const calcTime = require('../helpers/calcTime');

module.exports = getAllReviews = async(getAll, data, data_reviews, resultWindow)=>{
    const startTime = new Date();

    let win = await createWindow(300, 200);
    await win.loadFile("./pages/scrapeReviews.html");
    
    for (let i = 0; i < data.length; i++) {
      const reviews = await scrapeReviews(data[i]["Map Url"]);
      data[i].reviews = reviews;
    }
    win.close();
    
    const endTime = new Date();
    const timeExecuted = calcTime(startTime, endTime);
    
    win = await createWindow();
    
    data_reviews = data.filter((d) => d.reviews.length > 0);
    
    await win.loadFile("./pages/reviews.html");
    win.webContents.send("data-reviews", data_reviews);
    
    win.webContents.send("reviews-process-time", timeExecuted);
    
    resultWindow.webContents.send("reviews-process", 'finished');
    return data_reviews;

}

