<script>
  let { todos } = $props();

  const onchange = (e, todo) => {
    fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        description: e.target.value,
      }),
    });
  };
</script>

<div>
  {#each todos as todo}
    <input value={todo.description} onchange={(e) => onchange(e, todo)} />
  {/each}
</div>
