<script>
  import { username, password } from "../../stores";
  import Loading from "../Loading.svelte";
  import Advanced from "./Advanced.svelte";
  import ErrorView from "./ErrorView.svelte";

  let fetching = false;
  let showError = false;
  let msg = {};
  let search = "";
  let keyword = "";
  let res = [];
  let sType = "Regular";
  let mode = "def";
  let resMode = mode;
  let empty = false;

  $: invalid = search === "" ? true : false;

  function _search() {
    if (search === "") {
      return;
    }
    keyword = search;
    res = [];
    empty = false;
    let url = "http://localhost:8000/search/";
    let sentSearch = search;
    if (sType === "Advanced") {
      url = "http://localhost:8000/search/advanced/";
      sentSearch = mode + ":" + search;
    }
    fetching = true;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: sentSearch }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            msg = data;
            showError = true;
          });
          throw Error();
        }
      })
      .then((data) => {
        if (sType === "Regular") {
          res = data;
        } else {
          resMode = data.mode;
          res = data.results;
        }
        if (res.length === 0) {
          empty = true;
        }
      })
      .catch(() => {})
      .finally(() => {
        fetching = false;
      });
  }

  function highlight() {
    keyword = keyword.toLowerCase();
    if (res.length !== 0) {
      let ps = document.querySelectorAll(".sen");
      const re = new RegExp(keyword, "ig");
      ps.forEach((e) => {
        const text = e.innerHTML;
        let newText = text.replace(re, `<mark>${keyword}</mark>`);
        e.innerHTML = newText;
      });
    }
  }

  function detectEnter(e) {
    if (search !== "" && (e.key === "Enter" || e.keyCode === 13)) {
      _search();
    }
  }
</script>

{#if showError}
  <ErrorView bind:showError {msg} />
{/if}
<div class="adv">
  {#if sType === "Regular"}
    <button
      class="btn"
      id="adv-btn"
      on:click={() => {
        res = [];
        search = "";
        sType = "Advanced";
      }}>Advanced</button
    >
  {:else}
    <button
      class="btn"
      on:click={() => {
        sType = "Regular";
      }}>Regular</button
    >
  {/if}
</div>

<div class="container">
  <div class="info">
    <h3 class="title">{sType} Search</h3>
  </div>
  <div class="card form">
    {#if sType === "Advanced"}
      <Advanced bind:search {detectEnter} bind:mode />
    {:else}
      <input
        type="text"
        placeholder="keyword"
        bind:value={search}
        on:keyup={(e) => detectEnter(e)}
        style="min-width: 240px;"
      />
    {/if}

    {#if fetching}
      <Loading />
    {:else}
      <button class="btn" on:click={_search} disabled={invalid}>Search</button>
      {#if res.length !== 0}
        <button class="btn" on:click={highlight}>Highlight</button>
      {/if}
    {/if}
  </div>
  {#if empty}
    <p style="color: var(--sec-txt-clr); font-weight:900; letter-spacing: 2px;">
      ... No Result! ...
    </p>
  {/if}
  {#if res.length !== 0}
    <div class="result">
      <div class="search-info">
        <p>PDF ID</p>
        <p>Found: {res.length}</p>
        {#if sType === "Advanced"}
          <p>Mode: {resMode}</p>
        {/if}
      </div>

      {#each res as r}
        <div class="card res" style="padding: 0;">
          <p class="id">{r.pdf_ID}</p>
          <p class="sen">{r.sentence}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .res {
    display: flex;
    align-items: stretch;
    gap: 1rem;
  }

  .id,
  .sen {
    padding: 12px 18px;
    font-weight: 600;
  }

  .id {
    background-color: var(--bg-clr-sec);
  }

  .sen {
    text-align: left;
  }

  .search-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .search-info > p {
    text-align: left;
    font-weight: 600;
    font-size: 12px;
    color: var(--sec-txt-clr);
    font-style: italic;
  }

  .adv {
    z-index: 10;

    position: absolute;
    right: 0;
    top: -8px;
  }

  #adv-btn {
    border: none;
    color: white;
    background: linear-gradient(
      90deg,
      rgba(97, 12, 4, 1) 0%,
      rgba(185, 14, 10, 1) 20%,
      rgba(97, 12, 4, 1) 100%
    );
  }

  #adv-btn:hover {
    border: none;
    background: linear-gradient(
      90deg,
      rgba(97, 12, 4, 1) 0%,
      rgba(185, 14, 10, 1) 80%,
      rgba(97, 12, 4, 1) 100%
    );
  }
</style>
