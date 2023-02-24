import React from 'react';
import { useParams } from 'react-router-dom';
import Task from './Task';

const TaskPage = ({ tasks, onUpdate, onDelete }) => {
  const { id } = useParams();

  const task = tasks.find((task) => task.id === id);

  const handleUpdate = (id, newTitle, newDescription) => { 
    onUpdate(id, newTitle, newDescription);    
  };

  const handleDelete = ()=>{
    onDelete(id);
  }

  return (
    <div>
      {task ? (
        <Task
          id={task.id}
          title={task.title}
          description={task.description}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ) : (
        <p></p>
      )}      
     
      
    </div>
  );
};

export default TaskPage;
