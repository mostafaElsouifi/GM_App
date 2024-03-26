const ExcelJS = require('exceljs');
const saveToExcel = (filePath, data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add column headers
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    
    // Add data to worksheet
    data.forEach(row => {
        const rowData = headers.map(header => row[header]);
        worksheet.addRow(rowData);
    });

    // Save workbook to file
    workbook.xlsx.writeFile(`${require('os').homedir()}/Desktop/${filePath}.xlsx`)
        .then(() => {
            console.log(`Excel file saved successfully at ${filePath}`);
        })
        .catch(err => {
            console.error('Error saving Excel file:', err);
        });
}

module.exports = saveToExcel;
