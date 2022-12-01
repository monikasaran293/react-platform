import { useState } from "react"
import { STATUS, TOGGLE_STATUS } from "../../constants/todo.constants"

const TodoItem = ({ todo, onRemove, onUpdate }) => {
  const { status, name } = todo
  const [isEditing, setIsEditing] = useState(false)

  const onToggleTodo = () => {
    const newStatus = TOGGLE_STATUS[status]
    onUpdate({ ...todo, status: newStatus })
  }

  const onEditName = (e) => {
    const newName = e.target.value
    if (newName && name !== newName) {
      onUpdate({ ...todo, name: newName })
    }
    setIsEditing(false)

  }
  return <div className='todo-item'>
    <input
      className='todo-checkbox'
      type={'checkbox'}
      checked={status === STATUS.completed}
      onChange={onToggleTodo} />
    {
      isEditing
        ? <input
          autoFocus
          defaultValue={name}
          className={'todo-input'}
          placeholder='What needs to be done?'
          onBlur={onEditName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEditName(e)
            }
          }} />
        : <>
          <label onDoubleClick={() => setIsEditing(true)} className='todo-label'>{name}</label>
          <button
            className='todo-close'
            onClick={() => onRemove(todo.id)}>
            X
          </button>
        </>
    }
  </div>
}

export default TodoItem