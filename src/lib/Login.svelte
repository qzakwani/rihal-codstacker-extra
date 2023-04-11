<script>
  import { username, password, loggedIn } from "../stores";
  import Loading from "./Loading.svelte";
  import { isEmpty } from "../utils";

  let _status = 0;
  let msg = {};

  let form;
  function login() {
    _status = 2;
    msg = {};
    fetch("http://localhost:8000/account/login/", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
      },
    })
      .then((res) => {
        if (res.ok) {
          $loggedIn = true;
          return;
        } else {
          return res.json();
        }
      })
      .then((err) => {
        _status = 0;
        msg = err;
      });
  }

  function signUp() {
    _status = 2;
    msg = {};
    const credentials = new FormData(form);
    fetch("http://localhost:8000/account/sign-up/", {
      method: "POST",
      body: credentials,
    })
      .then((res) => {
        if (res.ok) {
          $loggedIn = true;
          return;
        } else {
          return res.json();
        }
      })
      .then((err) => {
        _status = 0;
        msg = err;
      });
  }
</script>

<div class="container">
  {#if _status === 0}
    <form bind:this={form} on:submit|preventDefault={login} class="card">
      <input
        type="text"
        placeholder="username"
        bind:value={$username}
        required
      />
      <input
        type="password"
        placeholder="password"
        bind:value={$password}
        required
      />
      <div class="btns">
        <button type="button" on:click={() => (_status = 1)} class="a-btn"
          >Sign Up</button
        >
        <button type="submit" class="btn">Login</button>
      </div>

      {#if !isEmpty(msg)}
        <div class="error">
          {JSON.stringify(msg, null, 2)}
        </div>
      {/if}
    </form>
  {:else if _status === 1}
    <form bind:this={form} on:submit|preventDefault={signUp} class="card">
      <input
        type="text"
        name="username"
        placeholder="username"
        bind:value={$username}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        bind:value={$password}
        required
      />
      <div class="btns">
        <button type="button" on:click={() => (_status = 0)} class="a-btn"
          >Login</button
        >
        <button type="submit" class="btn">Sign Up</button>
      </div>

      {#if !isEmpty(msg)}
        <div class="error">
          {JSON.stringify(msg, null, 2)}
        </div>
      {/if}
    </form>
  {:else}
    <Loading />
  {/if}
</div>

<style>
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  form {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
