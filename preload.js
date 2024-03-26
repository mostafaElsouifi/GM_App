const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('mainProcess', {
    searchValues: (searchValue, displayScraping, countrySelected, citiesSelected)=>ipcRenderer.invoke('search-values', searchValue, displayScraping, countrySelected, citiesSelected),
    
    //displayScraping: (checkBox)=>ipcRenderer.invoke('display-scraping', checkBox),
})

contextBridge.exposeInMainWorld('data', {
    allData: (callback,)=> ipcRenderer.on('data-g', (e, value)=> callback(value)),
    timeExecuted: (callback,)=> ipcRenderer.on('process-time', (e, value)=> callback(value)),
    
})

contextBridge.exposeInMainWorld('downloadProcess', {
    download: (method)=> ipcRenderer.send('download-method', method),
})
