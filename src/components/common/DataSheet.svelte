<script lang="ts">
  import { onMount } from 'svelte';
  import Spreadsheet from 'x-data-spreadsheet';
  import { setSpreadsheet } from './data/xspreadshi';

  let HTMLOUT;
  let xspr: Spreadsheet;

  onMount(() => {
    xspr = new Spreadsheet(HTMLOUT);
    setSpreadsheet(xspr);
    HTMLOUT.style.height = window.innerHeight - 400 + 'px';
    HTMLOUT.style.width = window.innerWidth - 50 + 'px';
  });
</script>

<main class="pb-10 mb-10">
  <div id="htmlout" bind:this={HTMLOUT} class="spreadsheet"></div>
</main>

<style>
  .spreadsheet {
    height: calc(100vh - 400px);
    width: calc(100vw - 50px);
  }
</style>
