<script>
  import { newPDF } from "../../stores";
  import DetailUpload from "./DetailUpload.svelte";
</script>

<div class="container">
  <div class="info">
    <h3 class="title">Uploaded PDF</h3>
  </div>

  <div class="f">
    {#each $newPDF as pdf}
      <DetailUpload {pdf} />
    {/each}
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
  .f {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
</style>
