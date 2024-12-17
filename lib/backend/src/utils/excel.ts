import * as XLSX from 'xlsx';
import * as path from 'path';


const readExcelFile = (filePath: string) => {
    try {
        const filePath2 = path.resolve(__dirname, filePath);
        const workbook = XLSX.readFile(filePath2);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        return data;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        throw error;
    }
};

export { readExcelFile }