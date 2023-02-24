import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import TaskPage from './TaskPage';
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSy*******************qOokk",
  authDomain: "reactdemo-*****.firebaseapp.com",
  
  projectId: "reactdemo-*****",
  storageBucket: "reactdemo-******.appspot.com",
  messagingSenderId: "1*********10",
  appId: "1:***********10:web:aea*******fa7*******18eb7"
};

firebase.initializeApp(firebaseConfig);

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('tasks').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await firebase.firestore().collection('tasks').add({ title, description});
    setTitle('');
    setDescription('');
  };

  const handleDelete = async id => {
    await firebase.firestore().collection('tasks').doc(id).delete();
  };

  const onUpdate =  async (id, newTitle, newDescription) => {
    await firebase.firestore().collection('tasks').doc(id).update({title:newTitle, description:newDescription})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} id={task.id}>
            {task.title} {task.description} 
            <button onClick={() => navigate("/tasks/"+task.id)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <br />
      <TaskPage tasks={tasks} onUpdate={onUpdate} onDelete={handleDelete}/>
      </>
  );
};

export default Tasks;