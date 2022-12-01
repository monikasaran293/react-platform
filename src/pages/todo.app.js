import { useMemo, useState } from 'react'
import TodoFooter from '../components/todo/todo.footer'
import TodoHeader from '../components/todo/todo.header'
import TodoList from '../components/todo/todo.list'
import { STATUS } from '../constants/todo.constants'
import './todo.app.css'


const TodoApp = () => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState(null)

  const activeTodos = useMemo(() => (todos.filter(todo => todo.status === STATUS.active)), [todos]);
  const completedTodos = useMemo(() => (todos.filter(todo => todo.status === STATUS.completed)), [todos]);
  const showTodos = useMemo(() => {
    const todosByFilter = {
      [STATUS.active]: activeTodos,
      [STATUS.completed]: completedTodos
    }
    return todosByFilter[filter] || todos
  }, [todos, filter]);

  const onAddTodo = (newTodo) => {
    setTodos([newTodo, ...todos])
  }

  const onRemoveTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const onUpdateTodo = (updatedTodo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === updatedTodo.id) return { ...todo, ...updatedTodo }
      return todo
    })
    setTodos(updatedTodos)
  }

  const clearCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => todo.status === STATUS.active)
    setTodos(updatedTodos)
  }

  return <div className='todo-app'>
    <TodoHeader
      onAddTodo={onAddTodo} />
    <TodoList
      showTodos={showTodos}
      onRemoveTodo={onRemoveTodo}
      onUpdateTodo={onUpdateTodo} />
    <TodoFooter
      activeCount={activeTodos.length}
      filter={filter}
      setFilter={setFilter}
      clearCompleted={clearCompletedTodos} />
  </div>
}

export default TodoApp
