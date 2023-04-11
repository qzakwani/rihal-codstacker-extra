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

  function fetchList() {
    fetching = true;
    fetch("http://localhost:8000/pdf/list/", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
      },
      body: JSON.stringify({ page: $pagePDFList, paginate: $paginatePDFList }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetching = false;
        pdfList = data;
      });
  }

  fetchList();
</script>

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
</style>
