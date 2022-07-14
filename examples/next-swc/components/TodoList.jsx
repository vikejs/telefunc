import React, { useState } from 'react'
import { onNewTodo } from './TodoList.telefunc.js'

export { TodoList }

function TodoList({ todoItemsInitial }) {
  const [todoItems, setTodoItems] = useState(todoItemsInitial)
  const [text, setText] = useState('')
  return (
    <>
      <ul>
        {todoItems.map((todoItem, i) => (
          <li key={i}>{todoItem.text}</li>
        ))}
        <li>
          <form
            onSubmit={async (ev) => {
              ev.preventDefault()
              setText('')
              const { todoItems } = await onNewTodo({ text })
              setTodoItems(todoItems)
            }}
          >
            <input type="text" onChange={(ev) => setText(ev.target.value)} value={text} />{' '}
            <button type="submit">Add to-do</button>
          </form>
        </li>
      </ul>
    </>
  )
}
