import * as XLSX from 'xlsx';

export function handleFile(e: { target: { files: Blob[], result: ArrayBufferLike}}) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = e?.target?.result && new Uint8Array(e.target.result as ArrayBufferLike);
        const workbook = XLSX.read(data, {type: 'array', cellFormula: true, cellNF: true, cellStyles: true});
        
        // Process the workbook
        processWorkbook(workbook);
    };
    
    reader.readAsArrayBuffer(file);
}

function processWorkbook(workbook) {
    // Assuming we're working with the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Extract column names
    const columnNames = getColumnNames(worksheet);
    
    // Extract row data
    const rowData = XLSX.utils.sheet_to_json(worksheet, {header: 1, raw: false});
    
    // Extract comments
    const comments = getComments(worksheet);
    
    // Extract formulas
    const formulas = getFormulas(worksheet);
    
    // Do something with the extracted data
    console.log('Column Names:', columnNames);
    console.log('Row Data:', rowData);
    console.log('Comments:', comments);
    console.log('Formulas:', formulas);
}

function getColumnNames(worksheet) {
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const columnNames = [];
    
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({r: range.s.r, c: col});
        const cell = worksheet[cellAddress];
        if (cell?.v) columnNames.push(cell.v) ;
    }
    
    return columnNames;
}

function getComments(worksheet) {
    const comments = {};
    
    if (worksheet['!comments']) {
        for (const [cellAddress, comment] of Object.entries(worksheet['!comments'])) {
            comments[cellAddress] = comment[0].t;
        }
    }
    
    return comments;
}

function getFormulas(worksheet) {
    const formulas = {};
    
    for (const [cellAddress, cell] of Object.entries(worksheet)) {
        if (cell.f) {
            formulas[cellAddress] = cell.f;
        }
    }
    
    return formulas;
}
