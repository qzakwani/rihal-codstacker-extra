<script>
  import { username, password, _pdf } from "../../stores";
  import { isEmpty } from "../../utils";
  import Loading from "../Loading.svelte";

  let word = "";
  let fetching = false;
  let res = {};

  function countWord() {
    if (word === "") {
      return;
    }
    res = {};
    fetching = true;
    fetch(
      "http://localhost:8000/search/count-word/" +
        $_pdf.id.toString() +
        "/" +
        word +
        "/",
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa($username + ":" + $password),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        res = data;
      })
      .finally(() => {
        fetching = false;
      });
  }

  function detectEnter(e) {
    if (word !== "" && (e.key === "Enter" || e.keyCode === 13)) {
      countWord();
    }
  }

  function search() {
    if (res) {
      let ps = document.querySelectorAll(".s");
      const re = new RegExp(res.word, "ig");
      ps.forEach((e) => {
        const text = e.innerHTML;
        let newText = text.replace(re, `<mark>${res.word}</mark>`);
        e.innerHTML = newText;
      });
    }
  }
</script>

<div class="container">
  <div class="info">
    <h3 class="title">Count Word</h3>
    <div class="right">
      <h3><span>ID</span> {$_pdf.id}</h3>
      <h3><span>file</span> {$_pdf.file_name}</h3>
      <h3><span>Total Pages</span> {$_pdf.number_of_pages}</h3>
    </div>
  </div>
  <div class="card word">
    <input
      type="text"
      placeholder="word"
      bind:value={word}
      on:keyup={(e) => detectEnter(e)}
    />

    {#if fetching}
      <Loading />
    {:else}
      <button class="btn" disabled={word === ""} on:click={countWord}
        >Count</button
      >
      {#if !isEmpty(res)}
        <button class="btn" on:click={search}>Highlight</button>
      {/if}
    {/if}
  </div>

  {#if !isEmpty(res)}
    <div class="result">
      <div>
        <h2><span>word</span> {res.word}</h2>
        <h2><span>Count</span> {res.count}</h2>
      </div>
      {#each res.sentences as s}
        <p class="s">- {s}</p>
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

  .word,
  .result > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .result > div {
    justify-content: center;
    margin-bottom: 16px;
  }

  .s {
    text-align: left;
    width: 100%;
  }
</style>
