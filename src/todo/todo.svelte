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

  const onclick = async (todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });

    todos = todos.filter(x => x.id !== todo.id);
  };
</script>

<div class="container">
  {#each todos as todo}
    <div>
      <label for={todo.id}>{todo.id}</label>
      <input
        id={todo.id}
        value={todo.description}
        onchange={(e) => onchange(e, todo)}
      />
      <button type="button" onclick={() => onclick(todo)}>X</button>
    </div>
  {/each}
</div>

<style>
  .container {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 0.25rem;
  }
</style>
