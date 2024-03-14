import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:7086";

const CreateTodo = ({ onSave, onCancel }) => {
  const [todo, setTodos] = useState({
    name: "",
    description: "",
    priority: "1",
    deadline: "",
  });

  const handleSave = async () => {
    const formattedDate = convertDate(todo.deadline);
    todo.deadline = formattedDate;
    try {
      await axios.post(`api/TodoItem/CreateNewTodo`, todo);
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  const convertDate = (dateString) => {
    const parts = dateString.split("/");
    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];
    return `${year}-${month}-${day}T00:00:00.000`;
  };

  

  

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: "9999",
      }}
    >
      <div
        style={{
          background: "#676767",
          padding: "20px",
          width: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -200%)",
          border: "2px solid #4e4e4e",
          borderRadius: "15px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Todo</h2>
        <p>
          <strong>Name: </strong>
          <input
            type="text"
            value={todo.name}
            onChange={(e) => setTodos({ ...todo, name: e.target.value })}
            style={{ backgroundColor: "#bcbcbc" }}
          />
        </p>
        <p>
          <strong>Description: </strong>
          <textarea
            style={{ height: "auto", backgroundColor: "#bcbcbc" }}
            value={todo.description}
            onChange={(e) => setTodos({ ...todo, description: e.target.value })}
          />
        </p>
        <p>
          <strong>Deadline:</strong>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={todo.deadline}
            onChange={(e) => setTodos({ ...todo, deadline: e.target.value })}
            style={{ backgroundColor: "#bcbcbc" }}
          />
        </p>
        <div style={{ textAlign: "center" }}>
          <button onClick={handleSave}>Create</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;

