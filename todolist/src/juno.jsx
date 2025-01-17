import React, { useState, useEffect } from 'react';

const Juno = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch('http://localhost:3001/get')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        setCompletedTasks(data.filter(todo => todo.completed).length);
      })
      .catch(error => console.error(error));
  };

  const addTodo = () => {
    fetch('http://localhost:3001/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: newTask, completed: false })
    })
    .then(response => response.json())
    .then(data => {
      setNewTask('');
      fetchTodos();
    })
    .catch(error => console.error(error));
  };

  const toggleTaskCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    setCompletedTasks(updatedTodos.filter(todo => todo.completed).length);

    fetch(`http://localhost:3001/update/${updatedTodos[index]._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodos[index])
    })
    .catch(error => console.error(error));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Juno</h2>
        <div style={styles.progressRing}>
          <span style={styles.progressText}>
            {completedTasks}/{todos.length}
          </span>
        </div>
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button style={styles.button} onClick={addTodo}>
          Add
        </button>
      </div>

      <div>
        {todos.map((todo, index) => (
          <div
            key={todo._id}
            style={{
              ...styles.taskContainer,
              ...(todo.completed ? styles.completedTask : {}),
            }}
            onClick={() => toggleTaskCompletion(index)}
          >
            <span style={styles.taskText}>{todo.task}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    padding: '40px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  progressRing: {
    backgroundColor: '#007AFF',
    borderRadius: '50%',
    width: 80,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    marginRight: 12,
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px 16px',
    backgroundColor: '#007AFF',
    color: 'white',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  taskContainer: {
    padding: '12px 16px',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    display: 'flex',
    cursor: 'pointer',
  },
  taskText: {
    fontSize: '16px',
  },
  completedTask: {
    backgroundColor: '#F0F0F0',
    textDecoration: 'line-through',
    color: '#7F7F7F',
  },
};

export default Juno;
