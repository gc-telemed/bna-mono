<script lang="ts">
  import { workBook, currentSheetName } from "../common/data/store";

  $: sheetNames = ['default'];

  workBook.subscribe(v => {
    sheetNames = v?.SheetNames || [];
    currentSheetName.set(sheetNames[0]);
  })
</script>

<nav class="hidden text-gray-500 text-xs sm:block overflow-x-auto overflow-y-clip">
  {#each sheetNames as sheetName}
    <button type="button" class="rounded-full border-2 border-fuchsia-200 px-2" on:click={() => currentSheetName.set(sheetName)}><span  class="hover:text-gray-700 hover:no-underline px-2">{sheetName}</span></button>
  {/each}
</nav>
