import type Spreadsheet from "x-data-spreadsheet";
import { stox, xtos } from "./x2s2x";
import * as XLSX from 'xlsx';

let xSpread: Spreadsheet;

export function setSpreadsheet(spreadsheet: Spreadsheet) {
  xSpread = spreadsheet;
}

export function getSpreadsheet() {
  return xSpread;
}


export function exportXlsx() {
  const new_wb = xtos(getSpreadsheet().getData());
  XLSX.writeFile(new_wb, 'cosys-work-ed.xlsx', {});
}


export function processWB(wb: XLSX.WorkBook) {
  const data = stox(wb);
  getSpreadsheet().loadData(data);
}
