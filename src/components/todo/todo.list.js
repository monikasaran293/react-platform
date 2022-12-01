import { memo } from "react"
import TodoItem from "./todo.item"

const TodoList = ({ showTodos, onUpdateTodo, onRemoveTodo }) => {
  return <div className='todo-list'>
    {
      (showTodos).map(todo => (
        <div key={todo.id}>
          <TodoItem
            todo={todo}
            onUpdate={onUpdateTodo}
            onRemove={onRemoveTodo} />
        </div>
      ))
    }
  </div>
}

export default memo(TodoList)