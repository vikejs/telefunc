import { getUser } from '../auth/getUser'
import { TodoList } from '../components/TodoList'
import { Todo } from '../database/Todo'

export default Page

function Page(props) {
  const title = `${props.user.name}'s to-do list`
  return (
    <>
      <h1>{title}</h1>
      <TodoList todoItemsInitial={props.todoItemsInitial} />
    </>
  )
}

export async function getServerSideProps(context) {
  const user = getUser(context.req)
  const todoItems = Todo.findMany({ authorId: user.id })
  return {
    props: {
      user,
      todoItemsInitial: todoItems
    }
  }
}
