<script>
  import Home from "./lib/Home.svelte";
  import About from "./lib/About.svelte";
  let page = "home";
  let themeSwitch = false;
  $: document.documentElement.setAttribute(
    "theme",
    themeSwitch ? "light" : "dark"
  );
</script>

<header>
  <h1>CodeStacker Challenge <span id="me">Alqasim Alzakwani</span></h1>
  <div class="main-actions">
    <button
      class="m-btn"
      on:click={() => (page = "home")}
      class:selected={page === "home"}>Home</button
    >
    <button
      class="m-btn"
      on:click={() => (page = "about")}
      class:selected={page === "about"}>About</button
    >
    <a href="/docs" target="_blank" class="m-btn">Docs</a>
    <a href="/docs/v2" target="_blank" class="m-btn">Docs V2</a>
    <label for="theme" class="switch">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        style="fill: {themeSwitch ? 'black' : 'white'}"
      >
        <path
          d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z"
        />
      </svg>
      <input type="checkbox" id="theme" hidden bind:checked={themeSwitch} />
    </label>
  </div>
</header>

<main>
  {#if page === "home"}
    <Home />
  {:else}
    <About />
  {/if}
</main>

<style>
  #me {
    font-size: 1rem;
    color: var(--sec-txt-clr);
  }

  .main-actions {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .switch {
    cursor: pointer;
    margin-left: 1rem;
    will-change: filter transform;
    transition: all 300ms ease-out;
  }

  .switch:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 0.75em var(--primary-clr));
  }

  .m-btn {
    font-weight: 600;
    margin: 0 auto;
    font-size: 1.1em;
    color: var(--btn-txt-clr);
    flex: 1;
    padding: 1rem 0;
    transition: all 300ms ease-out;
  }

  .m-btn:hover {
    background-color: var(--btn-clr);
  }

  .selected {
    background-color: var(--btn-clr);
  }
</style>
