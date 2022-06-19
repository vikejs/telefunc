import { provideTelefuncContext } from 'telefunc'
import { loadData } from '$lib/TodoList.telefunc.js'

export async function get(event) {
  provideTelefuncContext(event.locals)
  const { todoItems } = await loadData()

  return {
    body: {
      todoItemsInitial: todoItems
    }
  }
}