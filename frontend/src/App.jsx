import Nav from "./components/Nav"
import TodoForm from "./components/TodoForm"
import { TodoList } from "./components/TodoList"

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"
const App = () => {

  return (
    <div className="flex flex-col items-center py-48 bg-neutral-400 h-lvh">
      <Nav />
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default App
