import { derived, writable } from 'svelte/store';
import type { WorkBook } from 'xlsx';
import * as XLSX from 'xlsx';
import { processWB } from './xspreadshi';

export const workBook = writable<WorkBook | null>(null);
export const workBookMetaData = writable<{ [k: string]: string }>({});

export const sheetNames = derived(workBook, ($workBook) => $workBook?.SheetNames || []);

//create a derived store from workBook
export const sheetMapper = derived(workBook, ($workBook) => {
  const sheetNames = $workBook?.SheetNames;
  const sheetMap = new Map();
  sheetNames?.forEach((sheetName) => {
    const worksheet = $workBook?.Sheets[sheetName];
    if (!worksheet) return;
    const jsonData: object[] = XLSX.utils.sheet_to_json(worksheet);
    const emptyHeaders = jsonData.find((row) => {
      const keys = Array.from(Object.keys(row));
      const emptyKeys = keys.filter((key) => key.startsWith('__EMPTY'));
      return emptyKeys.length > 0;
    });
    const rowData = jsonData.filter((row) => {
      const keys = Array.from(Object.keys(row));
      const emptyKeys = keys.filter((key) => key.startsWith('__EMPTY'));
      return emptyKeys.length > 0 && JSON.stringify(row) !== JSON.stringify(emptyHeaders);
    });
    const headerGroupsFromRowData = Object.groupBy(rowData, (row) => JSON.stringify(Object.keys(row)));

    const emptyKeys = Object.keys(headerGroupsFromRowData);
    const newKeys = emptyKeys.map((k) => {
      const kArr: string[] = JSON.parse(k);
      return kArr.map((k) => emptyHeaders?.[k] ?? k);
    });
    console.log('keys - before - after', emptyKeys.length === newKeys.length);
    if (emptyKeys.length === 1) {
      sheetMap.set(sheetName, {
        sheet: worksheet,
        colDefs: newKeys[0].filter(v => typeof v === 'string').map((v, i) => ({ headerName: v, field: emptyKeys[i] ? JSON.parse(emptyKeys[i]) : v })),
        rowData: headerGroupsFromRowData[emptyKeys[0]],
      });
    } else if (emptyKeys.length > 1) {
      emptyKeys.forEach((k, i) => sheetMap.set(sheetName + "::" + i, { 
        sheet: worksheet, 
        colDefs: newKeys[i].filter(v => typeof v === 'string').map((v, id) => ({ headerName: v, field: JSON.parse(k)[id]})), 
        rowData: headerGroupsFromRowData[k] 
      }));
    }
  });
  return sheetMap;
});

export function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target?.result;
      if (data) {
        workBookMetaData.set({ name: file.name });
        const readContent = XLSX.read(data, { type: 'array' });
        workBook.set(readContent);
        processWB(readContent);
      }
    };
    reader.readAsArrayBuffer(file);
  }
}
