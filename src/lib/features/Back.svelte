<script>
  import Tooltip from "../Tooltip.svelte";
  import { feature } from "../../stores";
</script>

<div id="back">
  <Tooltip tip="back">
    <button
      class="btn"
      on:click={() => {
        feature.update((_) => "list");
      }}>&#8617;</button
    >
  </Tooltip>
</div>

<style>
  #back {
    position: absolute;
    top: 8px;
    left: 0;
    z-index: 10;
  }
</style>
