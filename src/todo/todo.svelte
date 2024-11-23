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

{#each todos as todo}
  <div>
    <label for={todo.id}>{todo.id}</label>
    <input id={todo.id} value={todo.description} onchange={(e) => onchange(e, todo)} />
  </div>
{/each}

<style>
  div {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 0.25rem;
  }
</style>
