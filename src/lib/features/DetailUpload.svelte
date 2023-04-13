<script>
  import { onDestroy } from "svelte";
  import { username, password } from "../../stores";
  import Loading from "../Loading.svelte";
  export let pdf;
  let status = pdf.parsing_status;

  function fetchStatus() {
    fetch(
      "http://localhost:8000/pdf/parsing-status/" + pdf.id.toString() + "/",
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa($username + ":" + $password),
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error();
        }
      })
      .then((data) => {
        status = data.parsing_status;
      })
      .catch(() => {});
  }
  let count = 0;
  let _id;
  function checkStatus() {
    count++;
    fetchStatus();
    if (count <= 10 && status === "IN PROCESS") {
      _id = setTimeout(checkStatus, 1000);
    }
  }
  checkStatus();
  onDestroy(() => {
    clearTimeout(_id);
  });
</script>

<div class="cont">
  <p>{pdf.file_name}</p>
  {#if status === "IN PROCESS"}
    <p
      style="background-color: #FFCC00; color: black; display: flex; align-items: center; gap: 10px"
    >
      {status}
      <Loading size={18} color="black" />
    </p>
  {:else if status === "DONE"}
    <p style="background-color: green; color: black">{status}</p>
  {:else if status === "FAILED"}
    <p style="background-color: red; color: white">{status}</p>
  {/if}
</div>

<style>
  .cont {
    display: flex;
    border-radius: 4px;
    border: 1px solid var(--divider-clr);
    padding: 2px;
  }

  .cont > p {
    padding: 8px 12px;
  }
</style>
