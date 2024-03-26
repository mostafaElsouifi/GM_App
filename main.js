const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path')
const saveToExcel = require('./helpers/saveToExcel');
const calcTime = require('./helpers/calcTime');
const prompt = require('electron-prompt');

const scrapeGM = require('./backend/mainData');


const createWindow =async ()=>{
    const win = new BrowserWindow({
        width: 800,
        height:1200,
        icon: path.join(__dirname, 'images/map.png'),
        webPreferences: {
            
            preload: path.join(__dirname, 'preload.js')
        },
    });
    //win.loadFile(file);
    return win
}
app.whenReady().then(async()=>{
    let data = [];
    const startTime = new Date();
    ipcMain.handle('search-values', async(e, searchValue, displayScraping, countrySelected, citiesSelected)=>{
        e.preventDefault();
        if(citiesSelected.length > 0){
          for(let i = 0; i < citiesSelected.length; i++){
            currentData = await scrapeGM(searchValue, displayScraping, countrySelected, citiesSelected[i]);
            data.push(...currentData);

          }
        
        }else{
          data = await scrapeGM(searchValue, displayScraping, countrySelected, '');

        }

        const endTime = new Date();

        const timeExecuted = calcTime(startTime, endTime);
        

        // create new window
        const win = await createWindow();
        await win.loadFile('./pages/result.html')
         win.webContents.send('data-g', data);
         win.webContents.send('process-time', timeExecuted);
        return data;
    })

    // for downloading 
    ipcMain.on('download-method', async(e, method)=>{
        e.preventDefault();
        // Function to create the Electron window for file location prompt
        async function createWindow(data) {
          const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
              nodeIntegration: true
            }
          });
  
    // prompt for file location
    const filePath = await prompt({
          title: 'Save Excel File',
          label: 'Enter file name:',
          inputAttrs: {
            type: 'text'
          },
          type: 'input'
        });


    saveToExcel(filePath, data);
    win.close()
    // win.close();
    //   if (filePath === null) {
    //     // User canceled the prompt
    //     win.close();
    //     return;
    //   }

 
  }

  // Function to save array data to Excel sheet
   createWindow(data)
    })
    const win = await createWindow();
    await win.loadFile('./pages/index.html')
})