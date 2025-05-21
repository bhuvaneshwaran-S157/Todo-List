import gsap from 'gsap';
import React, { useEffect, useReducer, useRef, useState } from 'react';

const initial = [];
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

const TodoList = () => {
  const boxInitial=useRef(null);
  const hTag=useRef(null);
  useEffect(()=>{
    gsap.from(boxInitial.current,{
      x:-200,
      duration:1,
      opacity:0,
      ease:"power3.out",
    })
    gsap.to(boxInitial.current,{
      x:0,
      opacity:1,
      duration:1
    })
    gsap.from(hTag.current,{
      y:-10,
      opacity:0,
      duration:1
    })
    gsap.to(hTag.current,{
      y:0,
      opacity:1,
      duration:1
    })
  },[])
  const [todos, dispatch] = useReducer(reducer, initial);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD', payload: text });
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className='min-h-screen bg-blue-950 flex flex-col items-center py-10'>
      <div className='w-full max-w-md px-4' ref={boxInitial}>
        <h1 className='text-3xl font-bold text-white mb-6' ref={hTag}>Todo List</h1>
        
        <div className='flex mb-6'>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className='flex-1 px-4 py-2 rounded-l focus:outline-none bg-amber-50'
            placeholder='Add a new task'
          
          />
          <button
            onClick={handleAddTodo}
            className='bg-amber-400 px-4 py-2 rounded-r hover:bg-amber-500 transition'
          >
            Add
          </button>
        </div>
        
        <ul className='bg-white rounded shadow'>
          {todos.map(todo => (
            <li key={todo.id} className='border-b last:border-b-0'>
              <div className='flex justify-between items-center p-3'>
                <span>{todo.text}</span>
                <button
                  onClick={() => dispatch({ type: 'REMOVE', payload: todo.id })}
                  className='text-red-500 hover:text-red-700'
                  aria-label='Remove todo'
                >
                  ×
                </button>
              </div>
            </li>
          ))}
          
          {todos.length === 0 && (
            <li className='p-4 text-gray-500 text-center'>
              No todos yet. Add one above!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;