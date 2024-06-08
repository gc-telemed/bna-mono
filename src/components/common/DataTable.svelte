<script lang="ts">
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
  import { GridApi, ModuleRegistry } from '@ag-grid-community/core';
  import * as agGrid from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-quartz.css';
  import { onMount } from 'svelte';
  import { BoolFilterSlot } from './data/bool-filter';
  import type { IRow } from './data/row-item';
  import { workBook } from './data/store';
  import Sidebar from '../ui/Sidebar.svelte';
  import Navbar from '../ui/Navbar.svelte';

  export let columnDefs: agGrid.ColDef<IRow>[];
  export let rowData: IRow[];

  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  console.log("columnDefs in grid", columnDefs)
  console.log("rowData in grid", rowData)

  let gridContainer;
  let gridApi;

  const gridOptions: agGrid.GridOptions<IRow> = {
    columnDefs,
    rowData,
    defaultColDef: {
      flex: 1,
      minWidth: 50,
      sortable: true,
      resizable: true,
      floatingFilter: true,
      editable: true,
    },
    onRowEditingStarted: (event: agGrid.RowEditingStartedEvent) => {
      console.log('now doing row editing');
    },
    onRowEditingStopped: (event: agGrid.RowEditingStoppedEvent) => {
      console.log('stopped doing row editing');
    },
    onCellEditingStarted: (event: agGrid.CellEditingStartedEvent) => {
      console.log('cellEditingStarted');
    },
    onCellEditingStopped: (event: agGrid.CellEditingStoppedEvent) => {
      console.log('cellEditingStopped');
    },
  };

  onMount(() => {
    gridApi = agGrid.createGrid<IRow>(gridContainer, gridOptions);
  });
</script>

<div class="data-grid ag-theme-quartz pl-16" bind:this={gridContainer}></div>

<style global>
  @import 'ag-grid-community/styles/ag-grid.css';
  @import 'ag-grid-community/styles/ag-theme-quartz.css';

  .data-grid {
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
