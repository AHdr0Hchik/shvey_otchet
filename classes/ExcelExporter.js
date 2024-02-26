const ExcelJS = require('exceljs');

class ExcelExporter {
    constructor() {
        
    }

    async createWorksheet(name, width, height, data) {
        var workbook = new ExcelJS.Workbook();

        workbook.creator = 'Andrey "AHdrOHchik" Khomenko';
        workbook.lastModifiedBy = 'JS';

        var worksheet = workbook.addWorksheet(`${name}`,{
                pageSetup:{paperSize: 9, orientation:'landscape'}
        });

        worksheet.pageSetup.margins = {
            left: 0.7, right: 0.7,
            top: 0.75, bottom: 0.75,
            header: 0.3, footer: 0.3
        };
        worksheet.properties.defaultRowHeight = 25;
        worksheet.properties.defaultColWidth = 25;
        
        for(let i=0; i<data.length; i++) {
            const arr = data[i];
            console.log(arr);
            worksheet.getColumn(i+1).values = arr;
        }
        workbook.xlsx.writeFile("./output24.xlsx");
    }
}


module.exports = ExcelExporter;