<script>
  import List from "./List.svelte";
  let feature = "list";
</script>

{#if feature === "list"}
  <List />
{:else if feature === ""}
  <!-- else if content here -->
{:else}
  <!-- else content here -->
{/if}
