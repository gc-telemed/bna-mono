<script>
  import { onMount } from 'svelte';
  import Spreadsheet from 'x-data-spreadsheet';
  import * as XLSX from 'xlsx';

  let HTMLOUT;
  let xspr;
  let file;

  onMount(() => {
    xspr = new Spreadsheet(HTMLOUT);
    HTMLOUT.style.height = window.innerHeight - 400 + 'px';
    HTMLOUT.style.width = window.innerWidth - 50 + 'px';
  });

  function handleFileChange(event) {
    console.log('handleFileChange', event.target.files);
    file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target?.result;
        if (data) {
          process_wb(XLSX.read(data, { type: 'array' }));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  function handleFileDrop(event) {
    console.log('handleFileDrop', event.dataTransfer.files);
    event.preventDefault();
    file = event.dataTransfer.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target?.result;
        if (data) {
          process_wb(XLSX.read(data, { type: 'array' }));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  function process_wb(wb) {
    var data = stox(wb);
    xspr.loadData(data);
  }

  function export_xlsx() {
    var new_wb = xtos(xspr.getData());
    XLSX.writeFile(new_wb, 'sheetjs.xlsx', {});
  }

  /**
   * Converts data from SheetJS to x-spreadsheet
   *
   * @param  {Object} wb SheetJS workbook object
   *
   * @returns {Object[]} An x-spreadsheet data
   */
  function stox(wb) {
    var out = [];
    wb.SheetNames.forEach(function (name) {
      var o = { name: name, rows: {} };
      var ws = wb.Sheets[name];
      if (!ws || !ws['!ref']) return;
      var range = XLSX.utils.decode_range(ws['!ref']);
      // sheet_to_json will lost empty row and col at begin as default
      range.s = { r: 0, c: 0 };
      var aoa = XLSX.utils.sheet_to_json(ws, {
        raw: false,
        header: 1,
        range: range,
      });

      aoa.forEach(function (r, i) {
        var cells = {};
        r.forEach(function (c, j) {
          cells[j] = { text: c };

          var cellRef = XLSX.utils.encode_cell({ r: i, c: j });

          if (ws[cellRef] != null && ws[cellRef].f != null) {
            cells[j].text = '=' + ws[cellRef].f;
          }
        });
        o.rows[i] = { cells: cells };
      });

      o.merges = [];
      (ws['!merges'] || []).forEach(function (merge, i) {
        //Needed to support merged cells with empty content
        if (o.rows[merge.s.r] == null) {
          o.rows[merge.s.r] = { cells: {} };
        }
        if (o.rows[merge.s.r].cells[merge.s.c] == null) {
          o.rows[merge.s.r].cells[merge.s.c] = {};
        }

        o.rows[merge.s.r].cells[merge.s.c].merge = [merge.e.r - merge.s.r, merge.e.c - merge.s.c];

        o.merges[i] = XLSX.utils.encode_range(merge);
      });

      out.push(o);
    });

    return out;
  }

  /**
   * Converts data from x-spreadsheet to SheetJS
   *
   * @param  {Object[]} sdata An x-spreadsheet data object
   *
   * @returns {Object} A SheetJS workbook object
   */
  function xtos(sdata) {
    var out = XLSX.utils.book_new();
    sdata.forEach(function (xws) {
      var ws = {};
      var rowobj = xws.rows;
      var minCoord = { r: 0, c: 0 },
        maxCoord = { r: 0, c: 0 };
      for (var ri = 0; ri < rowobj.len; ++ri) {
        var row = rowobj[ri];
        if (!row) continue;

        Object.keys(row.cells).forEach(function (k) {
          var idx = +k;
          if (isNaN(idx)) return;

          var lastRef = XLSX.utils.encode_cell({ r: ri, c: idx });
          if (ri > maxCoord.r) maxCoord.r = ri;
          if (idx > maxCoord.c) maxCoord.c = idx;

          var cellText = row.cells[k].text,
            type = 's';
          if (!cellText) {
            cellText = '';
            type = 'z';
          } else if (!isNaN(Number(cellText))) {
            cellText = Number(cellText);
            type = 'n';
          } else if (cellText.toLowerCase() === 'true' || cellText.toLowerCase() === 'false') {
            cellText = Boolean(cellText);
            type = 'b';
          }

          ws[lastRef] = { v: cellText, t: type };

          if (type == 's' && cellText[0] == '=') {
            ws[lastRef].f = cellText.slice(1);
          }

          if (row.cells[k].merge != null) {
            if (ws['!merges'] == null) ws['!merges'] = [];

            ws['!merges'].push({
              s: { r: ri, c: idx },
              e: {
                r: ri + row.cells[k].merge[0],
                c: idx + row.cells[k].merge[1],
              },
            });
          }
        });
      }
      ws['!ref'] = minCoord
        ? XLSX.utils.encode_range({
            s: minCoord,
            e: maxCoord,
          })
        : 'A1';

      XLSX.utils.book_append_sheet(out, ws, xws.name);
    });

    return out;
  }
</script>

<main class="pb-10 mb-10">
  <section>
    <div id="drop" role="dialog" on:dragover|preventDefault on:drop|preventDefault={handleFileDrop} class="drop-zone">
      Drop a spreadsheet file here to see sheet data or
    </div>
    <input type="file" name="xlfile" id="xlf" on:change={handleFileChange} />

    <button on:click={export_xlsx} id="xport">Export to XLSX!</button>
  </section>
  <div id="htmlout" bind:this={HTMLOUT} class="spreadsheet"></div>
</main>

<style>
  .drop-zone {
    border: 2px dashed #bbb;
    border-radius: 5px;
    padding: 25px;
    text-align: center;
    font:
      20pt bold,
      'Vollkorn',
      serif;
    color: #bbb;
  }

  .spreadsheet {
    height: calc(100vh - 400px);
    width: calc(100vw - 50px);
  }
</style>
