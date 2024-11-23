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

  const onadd = async (e) => {
    const newId = todos.map(x => x.id).reduce((p,c) => p < c ? c : p, 0) + 1;

    const response = await fetch(`/api/todos`, {
      method: "POST",
      body: JSON.stringify({
        id: newId,
        status: 'active',
        tags: 'tags',
        description: e.target.value,
      }),
    });

    e.target.value = '';
    const todo = await response.json();
    todos.push(todo);
  };

  const onclick = async (todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });

    todos = todos.filter((x) => x.id !== todo.id);
  };
</script>

<div class="container">
  <div>
    <label for="new-todo">0</label>
    <input
      id="new-todo"
      onchange={onadd}
    />
  </div>
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
