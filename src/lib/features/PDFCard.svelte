<script>
  import download from "downloadjs/download.min";
  import { displaySize, localizeDate } from "../../utils";
  import { unit, username, password, feature, _pdf } from "../../stores";
  import Tooltip from "../Tooltip.svelte";
  import Loading from "../Loading.svelte";

  let downloading = false;
  export let pdf;
  const UNITS = ["Byte", "KB", "MB"];
  function changeUnit() {
    const i = UNITS.indexOf($unit);
    if (i >= 0 && i < UNITS.length - 1) {
      unit.update((_) => UNITS[i + 1]);
    } else {
      unit.update((_) => UNITS[0]);
    }
  }

  function downloadPDF() {
    downloading = true;
    fetch("http://localhost:8000/pdf/download/" + pdf.id.toString() + "/", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
      },
    })
      .then((res) => res.blob())
      .then((blob) => download(blob, pdf.file_name, "pdf"))
      .finally(() => {
        downloading = false;
      });
  }

  function setPDF() {
    _pdf.update((_) => pdf);
  }
</script>

<div class="card pdf">
  <div class="p">
    <p><span>ID</span> {pdf.id}</p>
    <p><span>File</span> {pdf.file_name}</p>
  </div>

  <div>
    <p><span>Number of Pages</span> {pdf.number_of_pages}</p>
    <p><span>Size</span> {displaySize(pdf.size, $unit)}</p>
    <p><span>Time of Upload</span> {localizeDate(pdf.time_of_upload)}</p>
  </div>

  <div class="actions">
    <Tooltip tip="Get all the parsed sentences">
      <button class="btn">Sentences</button>
    </Tooltip>
    <Tooltip tip="Top 5 occurring words">
      <button class="btn">Top 5</button>
    </Tooltip>
    <Tooltip tip="Check the occurrence of a word"
      ><button
        class="btn"
        on:click={() => {
          setPDF();
          feature.update((_) => "word");
        }}>Word</button
      ></Tooltip
    >
    <Tooltip tip="Get a page as an image"
      ><button
        class="btn"
        on:click={() => {
          setPDF();
          feature.update((_) => "page");
        }}>Page</button
      ></Tooltip
    >
    {#if downloading}
      <Loading />
    {:else}
      <Tooltip tip="Retrieve this PDF"
        ><button class="btn" on:click={downloadPDF}>Download</button></Tooltip
      >
    {/if}
    <Tooltip tip="Change the size unit">
      <button class="btn" on:click={changeUnit}>Unit</button>
    </Tooltip>
    <Tooltip tip="Delete this PDF file and all its related data"
      ><button class="btn del-btn">Delete</button></Tooltip
    >
  </div>
</div>

<style>
  .pdf {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: center;
    gap: 3rem;
    border: 1px solid var(--divider-clr);
    margin-bottom: 10px;
  }

  .pdf span {
    font-size: 12px;
    color: var(--sec-txt-clr);
    font-weight: 600;
  }

  .pdf p {
    font-weight: 600;
  }

  .pdf > div {
    text-align: left;
  }

  .p > p {
    font-size: 18px;
  }

  .actions {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .actions button {
    font-size: 12px;
    padding: 12px 12px;
  }
</style>
