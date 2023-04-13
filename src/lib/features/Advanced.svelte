<script>
  import ASM from "./ASM";
  export let search;
  export let detectEnter;
  export let mode;
</script>

<div class="modes">
  <label class:selected={mode === "def"} for="def">
    def
    <input hidden type="radio" id="def" bind:group={mode} value="def" />
  </label>
  <label class:selected={mode === "c"} for="c">
    c
    <input hidden type="radio" id="c" bind:group={mode} value="c" />
  </label>
  <label class:selected={mode === "ic"} for="ic">
    ic
    <input hidden type="radio" id="ic" bind:group={mode} value="ic" />
  </label>
  <label class:selected={mode === "e"} for="e">
    e
    <input hidden type="radio" id="e" bind:group={mode} value="e" />
  </label>
  <label class:selected={mode === "ie"} for="ie">
    ie
    <input hidden type="radio" id="ie" bind:group={mode} value="ie" />
  </label>
  <label class:selected={mode === "sw"} for="sw">
    sw
    <input hidden type="radio" id="sw" bind:group={mode} value="sw" />
  </label>
  <label class:selected={mode === "isw"} for="isw">
    isw
    <input hidden type="radio" id="isw" bind:group={mode} value="isw" />
  </label>
  <label class:selected={mode === "ew"} for="ew">
    ew
    <input hidden type="radio" id="ew" bind:group={mode} value="ew" />
  </label>
  <label class:selected={mode === "iew"} for="iew">
    iew
    <input hidden type="radio" id="iew" bind:group={mode} value="iew" />
  </label>
  <label class:selected={mode === "ph"} for="ph">
    ph
    <input hidden type="radio" id="ph" bind:group={mode} value="ph" />
  </label>
  <label class:selected={mode === "eng"} for="eng">
    eng
    <input hidden type="radio" id="eng" bind:group={mode} value="eng" />
  </label>
</div>

<div style="position: relative;">
  <input
    type="text"
    placeholder="search"
    bind:value={search}
    on:keyup={(e) => detectEnter(e)}
    style="min-width: 240px;"
  />
  <div id="mode">
    {mode}
  </div>
</div>
<pre>{ASM[mode]}</pre>

<style>
  label {
    padding: 8px 12px;
    cursor: pointer;
  }

  label:hover {
    background-color: var(--btn-clr);
  }

  .selected {
    background-color: var(--btn-clr);
    font-weight: 600;
  }

  input {
    padding-left: 56px;
    width: 100%;
    font-size: 14px;
  }

  #mode {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8px;
    font-size: 14px;
    background-color: #2bc9af;
    border-radius: 3px;
    width: 40px;
    font-weight: 600;
    color: black;
  }

  pre {
    font-size: 12px;
    text-align: left;
    /* width: 500px; */
  }
</style>
