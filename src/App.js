import React, { useState, useEffect } from 'react'
import './App.css';
import Form from "./components/form"
import TodoList from "./components/TodoList"



 
function App() {
const [inputText, setInputText] = useState('')
const [todos, setTodos] = useState([]);
const [ status, setStatus] = useState('all')
const [filteredTodos, setFilteredTodos] = useState([]);

useEffect (()=>{
  getLocalTodos()
},[])

useEffect(()=> {
filterHandler()
saveLocalTodos()
}, [todos,status])


const filterHandler =(e)=>{
  switch(status){
    case 'completed':
      setFilteredTodos(todos.filter(todo=> todo.completed === true))
      break;
    case 'uncompleted' :
      setFilteredTodos(todos.filter(todo=> todo.completed === false)) 
      break; 
    default :
      setFilteredTodos(todos)
      break;

  }  
}


const  saveLocalTodos = ()=>{
 localStorage.setItem('todos', JSON.stringify(todos));
 
}

const getLocalTodos = () =>{
  if(localStorage.getItem('todos') === null){
    localStorage.setItem('todos', JSON.stringify([]));

  }else{
  let todoLocal =  JSON.parse(localStorage.getItem('todos'))
  setTodos(todoLocal)
  }

}

  return (

    <div className="Container">
  <header>
      <h1>Presh's Todo List</h1>
    </header>

      <Form 

      setStatus={setStatus}
       inputText={inputText}
        todos={todos}
       setTodos={setTodos}
       setInputText={setInputText}
  
       />



      <TodoList
     filteredTodos={filteredTodos}    

       todos={todos} 
       setTodos={setTodos}

       />   
    </div>
   
  );
}

export default App;
