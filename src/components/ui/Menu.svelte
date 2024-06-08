<script lang="ts">
  import { workBook } from "../common/data/store";

  $: sheetNames = ['default'];

  workBook.subscribe(v => {
    console.log("workbook data", v);
    sheetNames = v?.SheetNames || [];
  })
</script>

<nav class="hidden text-gray-500 text-xs sm:block overflow-x-auto overflow-y-clip">
  {#each sheetNames as sheetName}
    <button type="button" class="rounded-full border-2 border-fuchsia-200 px-2"><a href="/{sheetName}" class="hover:text-gray-700 hover:no-underline px-2">{sheetName}</a></button>
  {/each}
</nav>
