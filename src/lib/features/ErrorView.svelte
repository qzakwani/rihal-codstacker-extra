<script>
  export let showError;
  export let msg;
</script>

<div id="it">
  <div class="error">
    {JSON.stringify(msg, null, 4)}
  </div>

  <button on:click={() => (showError = false)} class="btn">Done</button>
</div>

<style>
  #it {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    backdrop-filter: blur(16px);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(0, 0, 0, 0.6);
  }

  button {
    background-color: var(--primary-clr);
    color: black;
  }
</style>
