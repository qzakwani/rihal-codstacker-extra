<script>
  import { _stopWords } from "../../stores";
  export let showSW;
</script>

<div id="it">
  <div class="cont">
    {#each $_stopWords as w}
      <p>{w}</p>
    {/each}
  </div>

  <button on:click={() => (showSW = false)} class="btn">Done</button>
</div>

<style>
  #it {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    padding: 16px;
    backdrop-filter: blur(16px);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .cont {
    width: 80%;
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow: auto;
  }

  button {
    background-color: var(--primary-clr);
    color: black;
    font-size: 18px;
  }

  p {
    font-weight: 600;
    font-size: 12px;
    padding: 10px;
    background-color: var(--bg-clr-sec);
    border-radius: 3px;
  }
</style>
