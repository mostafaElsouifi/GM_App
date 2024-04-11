const XLSX = require("xlsx");
module.exports = readExcelData = (filePath) => {
  // read the excel file
  const workbook = XLSX.readFile(filePath);

  // select the first sheet
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // convert the sheet to JSON format
  const data = XLSX.utils.sheet_to_json(sheet);

  // return the data as an array
  return data;
};
