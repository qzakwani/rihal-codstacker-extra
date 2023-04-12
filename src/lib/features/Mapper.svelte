<script>
  import { feature } from "../../stores";
  import Back from "./Back.svelte";
  import List from "./List.svelte";
  import Page from "./Page.svelte";
  import Word from "./Word.svelte";
  import Top5 from "./Top5.svelte";
</script>

{#if $feature === "list"}
  <List />
{:else if $feature === "page"}
  <Back />
  <Page />
{:else if $feature === "word"}
  <Back />
  <Word />
{:else if $feature === "top5"}
  <Back />
  <Top5 />
{/if}
