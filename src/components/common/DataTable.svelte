<script lang="ts">
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
  import { ModuleRegistry } from '@ag-grid-community/core';
  import * as agGrid from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-quartz.css';
  import { onMount } from 'svelte';
  
  export let columnDefs: agGrid.ColDef[];
  export let rowData: [];

  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  console.log("columnDefs in grid", columnDefs)
  console.log("rowData in grid", rowData)

  let gridContainer;
  let gridApi;

  const gridOptions: agGrid.GridOptions<any> = {
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
    gridApi = agGrid.createGrid(gridContainer, gridOptions);
  });
</script>
<div class="mx-auto flex flex-col">
<div class="data-grid ag-theme-quartz pl-16" style="height: 66vw; width: 96vw;" bind:this={gridContainer}></div>
</div>
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
