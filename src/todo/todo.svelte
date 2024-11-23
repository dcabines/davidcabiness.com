<script>
  let { todos } = $props();

  const onchange = (e, todo) => {
    fetch("/api/todos/", {
      method: "PUT",
      body: JSON.stringify({
        id: todo.id,
        description: e.value
      }),
    });
  };
</script>

<div>
  {#each todos as todo}
    <input value={todo.description} onchange={(e) => onchange(e, todo)} />
  {/each}
</div>
