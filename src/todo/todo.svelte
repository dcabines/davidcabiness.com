<script lang="ts">
  import { tick } from "svelte";
  import * as api from "./api";

  let { todos } = $props();
  const todos$ = $state(todos);
  const updatingIds = $state([]);

  const onchange = async (e, todo) => {
    updatingIds.push(todo.id);

    const updatedTodo = await api.update(todo.id, {
      description: e.target.value,
    });

    updatingIds.splice(updatingIds.indexOf(todo.id), 1);
    todos$[todos$.indexOf(todo)] = updatedTodo;

    tick().then(() => {
      e.target.focus();
    });
  };

  const onadd = async (e) => {
    updatingIds.push(0);
    const id = todos$.map((x) => x.id).reduce((p, c) => (p < c ? c : p), 0) + 1;

    const newTodo = await api.create({
      id,
      status: "active",
      tags: "tags",
      description: e.target.value,
    });

    e.target.value = "";
    updatingIds.splice(updatingIds.indexOf(0), 1);
    todos$.push(newTodo);

    tick().then(() => {
      e.target.focus();
    });
  };

  const ondelete = async (todo) => {
    updatingIds.push(todo.id);

    await api.remove(todo.id);
    const index = todos$.findIndex((x) => x === todo);
    updatingIds.splice(updatingIds.indexOf(todo.id), 1);
    todos$.splice(index, 1);
  };
</script>

<div class="container">
  <div class="line">
    <input
      placeholder="Add Todo"
      disabled={updatingIds.includes(0)}
      onchange={onadd}
    />
  </div>
  {#each todos$ as todo}
    <div class="line">
      <input
        value={todo.description}
        disabled={updatingIds.includes(todo.id)}
        onchange={(e) => onchange(e, todo)}
      />
      <button
        type="button"
        disabled={updatingIds.includes(todo.id)}
        title={`Delete ${todo.description}`}
        aria-label={`Delete ${todo.description}`}
        onclick={() => ondelete(todo)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff6188"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
        </svg>
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
    height: 24px;
  }

  button[disabled] {
    display: none;
  }
</style>
