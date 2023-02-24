import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Task = ({ id, title, description, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(id);
  };

  const handleUpdate = () => {
    onUpdate(id, newTitle, newDescription);
    setIsEditing(false);
    navigate("/tasks/")
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => navigate("/tasks/")}>Annulla</button>
        </div>
      ) : (
        <div>
          {title}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default Task;