<script>
  import PdfCard from "./PDFCard.svelte";
  import Loading from "../Loading.svelte";
  import {
    username,
    password,
    pagePDFList,
    paginatePDFList,
  } from "../../stores";

  let fetching = false;

  let pdfList = [];
  let currentPage = "";

  function fetchList() {
    fetching = true;
    fetch("http://localhost:8000/pdf/list/", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page: $pagePDFList, paginate: $paginatePDFList }),
    })
      .then((res) => res.json())
      .then((data) => {
        currentPage = data.page;
        pdfList = data.results;
      })
      .finally((_) => {
        fetching = false;
      });
  }

  function fetchAll() {
    fetching = true;
    fetch("http://localhost:8000/pdf/list/", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        currentPage = "All";
        pdfList = data;
      })
      .finally((_) => {
        fetching = false;
      });
  }

  fetchList();
</script>

<div class="edit">
  <div>
    <label for="">Per Page</label>
    <input type="number" bind:value={$paginatePDFList} />
    <label for="">Page</label>
    <input type="number" bind:value={$pagePDFList} />
    <button class="btn p-btn" on:click={fetchList}>Refresh</button>
    <button class="btn p-btn" on:click={fetchAll}>List All</button>
  </div>
  <div>
    <p>{currentPage}</p>
  </div>
</div>

{#if fetching}
  <Loading />
{:else}
  <div class="pdf-list">
    {#each pdfList as pdf (pdf.id)}
      <PdfCard {pdf} />
    {/each}
  </div>
{/if}

<style>
  .edit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    font-size: 12px;
  }

  .p-btn {
    font-size: 12px;
    padding: 8px;
  }
  label {
    color: var(--sec-txt-clr);
  }

  input {
    padding: 4px;
    width: 60px;
  }
</style>
