<script>
  let { todos } = $props();
  const todos$ = $state(todos);
  const nextId$ = $derived(todos$.map((x) => x.id).reduce((p, c) => (p < c ? c : p), 0) + 1);

  const onchange = (e, todo) => {
    fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        description: e.target.value,
      }),
    });
  };

  const onadd = async (e) => {
    const response = await fetch(`/api/todos`, {
      method: "POST",
      body: JSON.stringify({
        id: nextId$,
        status: "active",
        tags: "tags",
        description: e.target.value,
      }),
    });

    e.target.value = "";
    const todo = await response.json();
    todos$.push(todo);
  };

  const onclick = async (todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });

    const index = todos$.findIndex(x => x === todo);
    todos$.splice(index, 1);
  };
</script>

<div class="container">
  <div>
    <label for="new-todo">0</label>
    <input id="new-todo" onchange={onadd} />
  </div>
  {#each todos$ as todo}
    <div>
      <label for={todo.id}>{todo.id}</label>
      <input
        id={todo.id}
        value={todo.description}
        onchange={(e) => onchange(e, todo)}
      />
      <button type="button" onclick={() => onclick(todo)}>🗑</button>
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

  button {
    background: none;
    border: none;
    color: red;
    padding: 0.25rem;
    border-radius: 4px;
  }
</style>
