const XLSX = require("xlsx");
module.exports = readExcelData = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
};
