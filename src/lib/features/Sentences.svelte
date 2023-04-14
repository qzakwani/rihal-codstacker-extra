<script>
  import { username, password, _pdf } from "../../stores";
  import Loading from "../Loading.svelte";

  let fetching = false;
  let res = [];

  function load() {
    fetching = true;
    fetch("/pdf/list-sentences/" + $_pdf.id.toString() + "/", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res = data.sentences;
      })
      .finally(() => {
        fetching = false;
      });
  }

  load();
</script>

<div class="container">
  <div class="info">
    <h3 class="title">Parsed Sentences</h3>
    <div class="right">
      <h3><span>ID</span> {$_pdf.id}</h3>
      <h3><span>file</span> {$_pdf.file_name}</h3>
      <h3><span>Total Pages</span> {$_pdf.number_of_pages}</h3>
    </div>
  </div>
  {#if fetching}
    <Loading />
  {:else}
    <div class="result">
      {#each res as s}
        <p>- {s}</p>
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

  .result > p {
    text-align: left;
  }
</style>
