<script lang="ts">
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
  import { GridApi, ModuleRegistry } from '@ag-grid-community/core';
  import * as agGrid from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-quartz.css';
  import { onMount } from 'svelte';
  import { BoolFilterSlot } from './data/bool-filter';
  import type { IRow } from './data/row-item';

  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  let gridContainer;
  let gridApi: GridApi<IRow>;

  let eGui: HTMLDivElement;
  let rbAll: HTMLInputElement;
  let rbTrue: HTMLInputElement;
  let boolFilter: BoolFilterSlot;


  const gridOptions: agGrid.GridOptions<IRow> = {
    columnDefs: [
      { field: 'make', filter: 'agTextColumnFilter' }, 
      { field: 'model', filter: 'agTextColumnFilter' }, 
      { field: 'price', filter: "agNumberColumnFilter"}, 
      { field: 'electric', filter: BoolFilterSlot }
    ],
    rowData: [
      { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
      { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
      { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
      { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
      { make: 'Fiat', model: '500', price: 15774, electric: false },
      { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    ],
    defaultColDef: {
      flex: 1,
      minWidth: 50,
      sortable: true,
      resizable: true,
      floatingFilter: true
    },
  };

  onMount(() => {
    gridApi = agGrid.createGrid<IRow>(gridContainer, gridOptions);
  });
</script>

<div id="datagrid" class="ag-theme-quartz" style="height: 80vh; width: 80vw;" bind:this={gridContainer}></div>

<style global>
  @import 'ag-grid-community/styles/ag-grid.css';
  @import 'ag-grid-community/styles/ag-theme-quartz.css';

  #datagrid {
    --ag-header-foreground-color: blue;
  }

  .bool-filter {
    width: 200px;
  }

  .bool-filter > * {
    margin: 8px;
  }

  .bool-filter > div:first-child {
    font-weight: bold;
  }

  .bool-filter > label {
    display: inline-block;
  }

  :global(.ag-header-cell) {
    background: orange;
    font-size: 16px;
  }
</style>
