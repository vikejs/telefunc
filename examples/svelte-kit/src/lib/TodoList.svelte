<script>
  import { onNewTodo } from './TodoList.telefunc.js'
  export let todoItemsInitial;

  let todoItems = todoItemsInitial
  let text = ''

  async function handleSubmit() {
    let {todoItems: newTodoItems} = await onNewTodo({text})
    text = ''
    todoItems = newTodoItems
  }
</script>

<ul>
  {#each todoItems as todoItem, i}
    <li key={i}>{todoItem.text}</li>
  {/each}
  <li>
    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" bind:value={text} />
      <button type="submit">Add to-do</button>
    </form>
  </li>
</ul>