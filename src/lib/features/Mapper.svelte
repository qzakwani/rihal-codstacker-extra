<script>
  import { feature } from "../../stores";
  import Back from "./Back.svelte";
  import List from "./List.svelte";
  import Page from "./Page.svelte";
  import Word from "./Word.svelte";
  import Top5 from "./Top5.svelte";
  import Sentences from "./Sentences.svelte";
  import Search from "./Search.svelte";
  import Upload from "./Upload.svelte";
  import NewUpload from "./NewUpload.svelte";
</script>

{#if $feature === "list"}
  <List />
{:else if $feature === "search"}
  <Back />
  <Search />
{:else if $feature === "page"}
  <Back />
  <Page />
{:else if $feature === "word"}
  <Back />
  <Word />
{:else if $feature === "top5"}
  <Back />
  <Top5 />
{:else if $feature === "sens"}
  <Back />
  <Sentences />
{:else if $feature === "upload"}
  <Back />
  <Upload />
{:else if $feature === "new"}
  <Back />
  <NewUpload />
{/if}
