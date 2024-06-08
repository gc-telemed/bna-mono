import { derived, writable } from 'svelte/store';
import type { WorkBook } from 'xlsx';
import * as XLSX from 'xlsx';
import { processWB } from './xspreadshi';
import { spacedToCamelCase, toCamelKeys, toUiAmount } from './row-item';

export const workBook = writable<WorkBook | null>(null);
export const workBookMetaData = writable<{ [k: string]: string }>({});

export const sheetNames = derived(workBook, ($workBook) => $workBook?.SheetNames || []);

export const currentSheetName = writable<string | null>(null);

//create a derived store from workBook
export const sheetMapper = derived(workBook, ($workBook) => {
  const sheetNames = $workBook?.SheetNames;
  const sheetMap = new Map();
  sheetNames?.forEach((sheetName) => {
    const sheet = $workBook?.Sheets[sheetName];
    if (!sheet) return;
    const jsonData: object[] = XLSX.utils.sheet_to_json(sheet);
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

    if (emptyKeys.length > 0) {
      emptyKeys.forEach((k, i) => {
        const rowData =  headerGroupsFromRowData[k]?.map(toCamelKeys); 
        sheetMap.set(sheetName + '::' + i, {
          sheet,
          colDefs: newKeys[i]
            .filter((v) => typeof v === 'string')
            .map((v, id) => ({
              headerName: v,
              filter: true,
              field: spacedToCamelCase(v.startsWith('__EMPTY') ? v : JSON.parse(k)[id]),
              valueFormatter: (params) => {
                return typeof params.value === 'number' ? toUiAmount(params.value) : params.value;
              },
            })),
          rowData,
        })
      })
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
