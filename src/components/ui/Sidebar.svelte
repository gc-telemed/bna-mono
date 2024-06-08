<script lang="ts">
  import { workBook } from '../common/data/store';

  $: sheetNames = ['default'];

  workBook.subscribe((v) => {
    console.log('workbook data', v);
    sheetNames = v?.SheetNames || [];
  });

  export let open = false;
</script>

<aside class="absolute z-10 w-full h-full bg-gray-200 border-r-2 shadow-lg" class:open>
  <nav class="flex flex-col m-6 p-6 text-md">
    {#each sheetNames as sheetName}
      <a href="#{sheetName}" class="hover:text-gray-700 hover:no-underline">{sheetName}</a>
    {/each}
  </nav>
</aside>

<style>
  aside {
    left: -100%;
    transition: left 0.3s ease-in-out;
  }

  .open {
    left: 0;
  }
</style>
