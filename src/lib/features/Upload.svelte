<script>
  import { username, password, feature, newPDF } from "../../stores";
  import ErrorView from "./ErrorView.svelte";
  import Loading from "../Loading.svelte";

  let fetching = false;
  let form;
  let f;
  let showError = false;
  let msg = "";
  function upload() {
    const files = new FormData(form);
    fetching = true;
    fetch("http://localhost:8000/pdf/upload/", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa($username + ":" + $password),
      },
      body: files,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((d) => {
            msg = d;
            showError = true;
          });
          throw Error();
        }
      })
      .then((data) => {
        newPDF.update((_) => data["file/s"]);
        feature.update((_) => "new");
      })
      .catch(() => {})
      .finally(() => {
        fetching = false;
      });
  }
</script>

{#if showError}
  <ErrorView bind:showError {msg} />
{/if}
<div class="container">
  <div class="info">
    <h3 class="title">Upload PDF</h3>
  </div>
  <form
    bind:this={form}
    on:submit|preventDefault={upload}
    enctype="multipart/form-data"
  >
    <label for="files">Select files:</label>
    <br />
    <input type="file" id="files" name="file" multiple bind:files={f} />
    <br />
    <br />
    {#if fetching}
      <Loading />
    {:else}
      <button
        type="submit"
        class="btn"
        disabled={f === undefined}
        on:click={upload}>Upload</button
      >
    {/if}
  </form>
  <div class="f">
    {#if f !== undefined}
      {#each Object.entries(f) as [_, i]}
        <div class="cont">
          <p>{i.name}</p>
          <p style="background-color: var(--bg-clr-sec);">{i.size} B</p>
        </div>
      {/each}
    {/if}
  </div>
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

  .cont {
    border-radius: 4px;
    border: 1px solid var(--divider-clr);
    padding: 1px;
  }

  .cont,
  .f {
    display: flex;
  }
  .f {
    gap: 1rem;
    flex-wrap: wrap;
  }

  .cont > p {
    padding: 8px 12px;
  }
</style>
