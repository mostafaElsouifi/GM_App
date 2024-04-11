const saveToExcel = require('../helpers/saveToExcel');
const prompt = require('electron-prompt');

module.exports = async(data,e, method)=>{
    e.preventDefault();
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

}