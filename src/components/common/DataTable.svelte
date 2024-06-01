<script lang="ts">
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
  import { GridApi, ModuleRegistry } from '@ag-grid-community/core';
  import * as agGrid from 'ag-grid-community';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-quartz.css';
  import { onMount } from 'svelte';

  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  let gridContainer;
  let gridApi: GridApi;

  const gridOptions = {
    columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }, { field: 'electric' }],
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
    },
  };

  onMount(() => {
    new agGrid.Grid(gridContainer, gridOptions);
  });
</script>

<div id="datagrid" class="ag-theme-quartz" style="height: 80vh; width: 80vw;" bind:this={gridContainer}></div>

<style global>
  @import 'ag-grid-community/styles/ag-grid.css';
  @import 'ag-grid-community/styles/ag-theme-quartz.css';

  #datagrid {
    --ag-header-foreground-color: blue;
  }
  :global(.ag-header-cell) {
    background: orange;
    font-size: 16px;
  }
</style>
