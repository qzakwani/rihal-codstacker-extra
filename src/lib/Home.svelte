<script>
  import Login from "./Login.svelte";
  import Mapper from "./features/Mapper.svelte";
  import { loggedIn, username, password, feature } from "../stores";

  function logout() {
    loggedIn.update((_) => false);
    password.update((_) => "");
  }
</script>

<article>
  {#if $loggedIn}
    <div class="actions">
      <div class="logout">
        <button class="btn del-btn" on:click={logout}>Logout</button>
      </div>
      <h3>{$username}</h3>
      <div class="main">
        <button
          class="btn"
          style="background-color: #E8AC41; color: black"
          on:click={() => {
            feature.update((_) => "upload");
          }}>Upload</button
        >
        <button
          class="btn"
          style="background-color: #2bc9af; color: black"
          on:click={() => {
            feature.update((_) => "search");
          }}>Search</button
        >
      </div>
    </div>
    <div style="position: relative;">
      <Mapper />
    </div>
  {:else}
    <Login />
  {/if}
</article>

<style>
  article {
    height: 100%;
  }

  .actions {
    background-color: var(--bg-clr-sec);
    padding: 12px;
    border-bottom: 2px solid var(--divider-clr);
    border-top: 2px solid var(--divider-clr);
    margin-bottom: 16px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }

  button {
    padding: 6px 12px;
  }

  .logout {
    text-align: left;
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
</style>
