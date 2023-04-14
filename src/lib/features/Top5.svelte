<script>
  import { username, password, _pdf, _stopWords } from "../../stores";
  import { isEmpty } from "../../utils";
  import Loading from "../Loading.svelte";
  import StopWords from "./StopWords.svelte";

  let ignore = "";
  let top = 5;
  let fetching = false;
  let res = {};

  function refresh() {
    res = {};
    fetching = true;
    fetch("/search/top5/" + $_pdf.id.toString() + "/", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ top, ignore }),
    })
      .then((res) => res.json())
      .then((data) => {
        res = data;
      })
      .finally(() => {
        fetching = false;
      });
  }

  let showSW = false;
  let fetchingSW = false;
  function stopWords() {
    if ($_stopWords.length !== 0) {
      showSW = true;
      return;
    } else {
      fetchingSW = true;
      fetch("/search/stop-words/", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa($username + ":" + $password),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          $_stopWords = data.stop_words;
          showSW = true;
        })
        .finally(() => {
          fetchingSW = false;
        });
    }
  }

  refresh();
</script>

{#if showSW}
  <StopWords bind:showSW />
{/if}
<div class="container">
  <div class="info">
    <h3 class="title">Top Words</h3>
    <div class="right">
      <h3><span>ID</span> {$_pdf.id}</h3>
      <h3><span>file</span> {$_pdf.file_name}</h3>
      <h3><span>Total Pages</span> {$_pdf.number_of_pages}</h3>
    </div>
  </div>
  <div class="card form">
    <input type="number" placeholder="top" bind:value={top} />
    <input
      type="text"
      placeholder="words,separated,by,comma,to,ignore"
      bind:value={ignore}
      style="min-width: 240px;"
    />
    {#if fetching}
      <Loading />
    {:else}
      <button class="btn" on:click={refresh}>Refresh</button>
    {/if}
    {#if fetchingSW}
      <Loading />
    {:else}
      <button class="btn" on:click={stopWords}>Stop Words</button>
    {/if}
  </div>

  {#if !isEmpty(res)}
    <div class="result">
      {#each Object.entries(res) as [word, count]}
        <div class="card top" style="padding: 0;">
          <p class="word">{word}</p>
          <p class="count">{count}</p>
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

  .right {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  span {
    font-weight: 600;
    font-size: 12px;
    color: var(--sec-txt-clr);
    font-size: 10px;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form,
  .top {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .top {
    justify-content: space-between;
  }
  .word,
  .count {
    padding: 12px 18px;
    font-weight: 600;
  }

  .count {
    background-color: var(--bg-clr-sec);
  }
</style>
