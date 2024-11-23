<script>
  let { todos } = $props();
</script>


<div>
    {#each todos as todo}
    <input value={todo.description} />
    {/each}
</div>