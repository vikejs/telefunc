export { Todo }

const Todo = {
  findMany,
  createNew
}

const database = (global.database = global.database || {
  todoItems: [
    { text: 'Buy milk', authorId: 0 },
    { text: 'Buy strawberries', authorId: 0 }
  ]
})

function findMany({ authorId }) {
  return database.todoItems.filter((todoItem) => todoItem.authorId === authorId)
}

function createNew({ text, authorId }) {
  database.todoItems.push({ text, authorId })
}
