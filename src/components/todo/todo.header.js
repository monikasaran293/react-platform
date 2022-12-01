import { memo, useState } from "react"
import { uniqueId } from 'lodash'
import { STATUS } from "../../constants/todo.constants"

const getNewTodo = (name) => ({
  id: uniqueId('todo_'),
  name,
  createdAt: new Date(),
  status: STATUS.active
})

const TodoHeader = ({ onAddTodo }) => {
  const [todoInput, setTodoInput] = useState('')

  const onTodoAdd = () => {
    if (todoInput) {
      const newTodo = getNewTodo(todoInput)
      onAddTodo(newTodo)
      setTodoInput('')
    }
  }

  return <div className='todo-header'>
    <input
      value={todoInput}
      className={'todo-input'}
      placeholder='What needs to be done?'
      onChange={(e) => setTodoInput(e.target.value)}
      onBlur={onTodoAdd}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onTodoAdd(e)
        }
      }} />
  </div>
}

export default memo(TodoHeader)