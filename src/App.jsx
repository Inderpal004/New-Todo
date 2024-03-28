import React, { useState, useEffect } from 'react';

export default function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, todo]);
      setTodo('');
    }
  };

  const handleDlt = (index) => {
    const newTodos = todos.filter((item, i) => i !== index);
    setTodos(newTodos);
  }

  const handleEdit = (index) => {
    const newTodo = todos.filter((item, i) => i === index);
    const newTodos = todos.filter((item, i) => i !== index);
    setTodos(newTodos);
    setTodo(newTodo[0]);
  }

  const handleClear=()=>{
    setTodos([]);
  }

  return (
    <div className="container">
      <div className="todo">
        <h1>Todos</h1>
        <div className="input-box">
          <input type="text" placeholder='Add Todos' value={todo} onChange={handleChange} />
          <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>

        <hr />

        <ul>
          {
            todos.length === 0 ? <p>No todos to display.</p> : null
          }
          {
            todos.map((item, index) => {
              return <li key={index}>{item}<div className="button-div"> <button className="edit" onClick={() => handleEdit(index)}>Edit</button> <button className="dlt" onClick={() => handleDlt(index)}>Delete</button> </div></li>
            })
          }
        </ul>

        
          <button className="clear" onClick={handleClear}>Clear All</button>
        
      </div>
    </div>
  )
}
