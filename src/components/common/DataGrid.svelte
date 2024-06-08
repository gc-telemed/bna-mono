<script lang="ts">
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-quartz.css';
  import * as XLSX from 'xlsx';
  import { sheetMapper, workBook } from './data/store';
  import DataTable from './DataTable.svelte';

</script>
<div class="data-grid px-12 mx-auto flex flex-col" >
{#each $sheetMapper.keys() as sheetName}
  {#if $sheetMapper.get(sheetName)?.colDefs && $sheetMapper.get(sheetName)?.rowData}
    <h1 class="px-12 mx-auto">{sheetName}</h1>
    <pre>{JSON.stringify($sheetMapper.get(sheetName).colDefs)}</pre>
    <pre>{JSON.stringify($sheetMapper.get(sheetName).rowData)}</pre>
    <DataTable columnDefs={$sheetMapper.get(sheetName).colDefs} rowData={$sheetMapper.get(sheetName).rowData} />
  {/if}
{/each}
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

