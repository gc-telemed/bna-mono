import { writable } from "svelte/store";
import type { WorkBook } from "xlsx";
import * as XLSX from 'xlsx';
import { processWB } from "./xspreadshi";

export const workBook = writable<WorkBook | null>(null);
export const workBookMetaData = writable<{[k: string]: string}>({});

export function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target?.result;
      if (data) {
        workBookMetaData.set({ name: file.name});
        const readContent = XLSX.read(data, { type: 'array' });
        workBook.set(readContent);
        processWB(readContent);
      }
    };
    reader.readAsArrayBuffer(file);
  }
}
