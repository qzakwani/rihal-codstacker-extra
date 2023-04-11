<script>
  import Login from "./Login.svelte";
  import Mapper from "./features/Mapper.svelte";
  import { loggedIn, username } from "../stores";
</script>

<article>
  {#if $loggedIn}
    <Mapper />
  {:else}
    <Login />
  {/if}
</article>

<style>
  article {
    height: 100%;
  }
</style>
