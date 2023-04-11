<script>
  export let color = "var(--primary-clr)";
  export let size = 30;
</script>

<div class="spinner">
  <svg
    style="fill: {color};"
    xmlns="http://www.w3.org/2000/svg"
    width="{size}px"
    height="{size}px"
    viewBox="0 0 24 24"
  >
    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
  </svg>
</div>

<style>
  .spinner {
    animation: spin 800ms ease-in-out infinite reverse;
  }
  @keyframes spin {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
