import { memo } from "react"
import { STATUS } from "../../constants/todo.constants"

const TodoFooter = ({ activeCount, filter, setFilter, clearCompleted }) => {

  return <div className='todo-footer'>
    <div>{activeCount} items left</div>
    <div className='todo-filters' onClickCapture={(e) => setFilter(e.target.id)}>
      <div className={filter ? '' : 'active'}>All</div>
      <div id={STATUS.active} className={filter === STATUS.active ? 'active' : ''}>Active</div>
      <div id={STATUS.completed} className={filter === STATUS.completed ? 'active' : ''}>Completed</div>
    </div>
    <button
      onClick={clearCompleted}
      className='clear-todos'>
      Clear completed
    </button>
  </div>
}

export default memo(TodoFooter)