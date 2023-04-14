<script>
  import download from "downloadjs/download.min";
  import { username, password, _pdf } from "../../stores";
  import Loading from "../Loading.svelte";

  let form;
  let p = 1;
  let format = "jpeg";
  let downloading = false;

  $: invalid = p > $_pdf.number_of_pages || p < 1 ? true : false;

  function getPage() {
    downloading = true;
    const filename =
      $_pdf.file_name.split(".")[0] + "_page_" + p.toString() + "." + format;
    const payload = new FormData(form);
    fetch(
      "/pdf/" + $_pdf.id.toString() + "/download-page/" + p.toString() + "/",
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa($username + ":" + $password),
        },
        body: payload,
      }
    )
      .then((res) => res.blob())
      .then((blob) => download(blob, filename, format))
      .finally(() => {
        downloading = false;
      });
  }
</script>

<div class="container">
  <div class="info">
    <h3 class="title">Page as an Image</h3>
    <div class="right">
      <h3><span>ID</span> {$_pdf.id}</h3>
      <h3><span>file</span> {$_pdf.file_name}</h3>
      <h3><span>Total Pages</span> {$_pdf.number_of_pages}</h3>
    </div>
  </div>

  <form bind:this={form} on:submit|preventDefault={getPage} class="card">
    <div class="entry">
      <label for="" style="color: inherit;">Page</label>
      <span>MAX. {$_pdf.number_of_pages}</span>
      <input
        type="number"
        min="1"
        max={$_pdf.number_of_pages}
        step="1"
        bind:value={p}
        class:invalid
        required
      />
    </div>
    <div class="entry">
      <label for=""
        >Resolution in <abbr
          title="Dots per inch is a measure of spatial printing, video or image scanner dot density, in particular the number of individual dots that can be placed in a line within the span of 1 inch"
          >dpi</abbr
        ></label
      >
      <input
        type="number"
        name="dpi"
        min="96"
        step="1"
        placeholder="defaults to 96"
      />
    </div>

    <div class="entry">
      <label for="">Format</label>
      <select name="format" bind:value={format}>
        <option value="jpeg">jpeg</option>
        <option value="png">png</option>
      </select>
    </div>
    {#if downloading}
      <Loading />
    {:else}
      <button type="submit" class="btn" disabled={invalid}>Download</button>
    {/if}
  </form>
</div>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
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
  form {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .invalid,
  .invalid:focus {
    border: 1px solid red;
  }

  .entry {
    text-align: left;
  }
  .entry > input,
  select {
    width: 100%;
  }

  label,
  span {
    font-weight: 600;
    font-size: 12px;
    color: var(--sec-txt-clr);
  }

  span {
    font-size: 10px;
  }
</style>
