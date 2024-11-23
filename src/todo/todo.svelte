<script>
  let { todos } = $props();
  const todos$ = $state(todos);

  const nextId$ = $derived(
    todos$.map((x) => x.id).reduce((p, c) => (p < c ? c : p), 0) + 1,
  );

  const onchange = async (e, todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        description: e.target.value,
      }),
    });

    todo.description = e.target.value;
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

  const ondelete = async (todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });

    const index = todos$.findIndex((x) => x === todo);
    todos$.splice(index, 1);
  };
</script>

<div class="container">
  <div class="line">
    <label for="new-todo">0</label>
    <input id="new-todo" onchange={onadd} />
  </div>
  {#each todos$ as todo}
    <div class="line">
      <input value={todo.description} onchange={(e) => onchange(e, todo)} />
      <button
        type="button"
        title={`Delete ${todo.description}`}
        aria-label={`Delete ${todo.description}`}
        onclick={() => ondelete(todo)}
      >
        <img src="/icons/trash.svg" alt={`Delete ${todo.description}`} />
      </button>
    </div>
  {/each}
</div>

<style>
  .container {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  .line {
    display: flex;
    align-items: center;
    gap: 1ch;
  }

  input {
    padding: 0.25rem;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
