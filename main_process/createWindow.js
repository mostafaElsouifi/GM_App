const { BrowserWindow } = require("electron");
const path = require("node:path");
module.exports =  createWindow = async (width = 800, height = 1200) => {
    const win = new BrowserWindow({
      width: width,
      height: height,
      icon: path.join(__dirname, "images/map.png"),
      webPreferences: {
        preload: path.join(__dirname, "../preload.js"),
      },
    });
    //win.loadFile(file);
    return win;
  };