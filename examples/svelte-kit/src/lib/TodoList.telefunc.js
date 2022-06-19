import { getContext, shield } from 'telefunc'
const t = shield.type

export { loadData }
export { onNewTodo }

const database = {
  todoItems: [],
}

async function loadData() {
  const { user } = getContext()
  const { todoItems } = database
  return {
    user,
    todoItems,
  }
}

shield(onNewTodo,[{text: t.string}])
async function onNewTodo({ text }) {
  database.todoItems.push({ text })
  const { todoItems } = database
  return { todoItems }
}

// Initial data
database.todoItems.push({ text: 'Buy milk' })
database.todoItems.push({ text: 'Buy strawberries' })