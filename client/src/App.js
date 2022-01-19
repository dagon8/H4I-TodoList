import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

import { FaCheckSquare, FaPlus, FaTrash, FaRedo } from 'react-icons/fa';
//import { IconContext } from 'react-icons/lib';

function App() {
  //states
  const [todoName, setTodoName] = useState("");
  const [newTodoName, setNewTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);


  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setTodoList(response.data);
    });
  }, [todoList]);

  //functions
  const addTodo = () => {
    Axios.post("http://localhost:3001/insert", {
      todoName: todoName,
    });
  };

  const updateTodo = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id, 
      newTodoName: newTodoName,
    });
  };
  
  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  

  return (
    <div className="App">
      
      <header>
        <FaCheckSquare className='header-check'/>
        
        <h1>To-do List</h1>
      </header>
      
      <nav>
        <form className='add-todo'>
          <input type="text" placeholder='Todo...' onChange={(e) => {setTodoName(e.target.value)}} className='textbox' />
          <button type="submit" onClick={addTodo} className='add' ><FaPlus className='add-plus' /></button>
        </form>
      </nav>


      <main className='todos'>
        {todoList.map((val, key) => {
          return (
          <div className="todo" key={key}>
            
            <h4>{val.todoName}</h4>

            <form className='change-todo'>
              <input type="text" placeholder='Update Todo...' onChange={(e) => {setNewTodoName(e.target.value)}} className='new-todo-name' />
              <button type="submit" onClick={() => updateTodo(val._id)} className='update' ><FaRedo className='update-btn'/></button>
              <button onClick={() => deleteTodo(val._id)} className='delete'><FaTrash className='delete-btn'/></button>
            </form>
      
          </div>
          
          )
        })}
      </main>

    </div>
  );
}

export default App;
