import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'
// useEffect hook
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async function (res) {
        const json = await res.json();
        setTodos(json.todos); // Set initial todos
      })
      .catch((error) => {
        console.log("Error fetching todos:", error);
      });
  }, []);  // Empty dependency array: fetch only once


  return (
    <div className='col maindiv'>
      <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
        </svg>
        <u>My Todo-s</u>
      </p>
      <CreateTodo></CreateTodo>
      <hr class="my-4"></hr>
      <Todos todos={todos}></Todos>
    </div>
  )
}

export default App
