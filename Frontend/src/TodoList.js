import { useEffect, useState } from "react";
import { todoContainerStyle } from "./TodoContainer";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:7086";

const TodoList = ({ activeTab, selectedSort }) => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [expandedTodos, setExpandedTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deletedTodo, setDeletedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      let apiUrl = "api/TodoItem/todoItems";
      if (selectedSort === "sortedpriority") {
        apiUrl = "api/TodoItem/sortedPrioritys";
      } else if (selectedSort === "sortedprioritydescending") {
        apiUrl = "api/TodoItem/sortedPrioritysDescending";
      } else if (selectedSort === "sorteddeadlines") {
        apiUrl = "api/TodoItem/sortedDeadlines";
      } else if (selectedSort === "sorteddeadlinesdescending") {
        apiUrl = "api/TodoItem/sortedDeadlinesDescending";
      }

      const response = await axios.get(apiUrl);
      setTodos(response.data);
    };

    fetchTodos();
  }, [selectedSort]);

  useEffect(() => {
    const fetchCompleted = async () => {
      const response = await axios.get("api/TodoItem/completedItems");
      setCompleted(response.data);
    };

    fetchCompleted();
  }, []);

  const handleExpand = (index) => {
    setExpandedTodos((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const handleEdit = (todo) => {
    setEditMode(true);
    setEditedTodo(todo);
  };

  const handleSave = async () => {
    try {
      await axios.put(`api/TodoItem/edit`, editedTodo);
      setEditMode(false);
      setEditedTodo(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (todo) => {
    setDeletedTodo(todo);
    setDeleteMode(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`api/TodoItem/delete?id=${deletedTodo.id}`);
      setDeleteMode(false);
      setDeletedTodo(null);
      const response = await axios.get("api/TodoItem/todoItems");
      setTodos(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteMode(false);
    setDeletedTodo(null);
  };

  const handleToggle = async (todo) => {
    const updatedTodo = { ...todo, IsComplete: true };
    await axios.put(`api/TodoItem/edit`, updatedTodo);
    window.location.reload();
  };

  const handleMove = async (todo) => {
    const updatedTodo = { ...todo, IsComplete: false };
    await axios.put(`api/TodoItem/edit`, updatedTodo);
    window.location.reload();
  };

  return (
    <div>
      {activeTab === "todos" && (
        <>
          {todos.map((todo, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input type="checkbox" onChange={() => handleToggle(todo)} />
              <div style={todoContainerStyle}>
                <p style={{ textAlign: "center" }}>
                  <strong>{todo.name}</strong>
                </p>
                <p>
                  <strong>Description:</strong> {todo.description}
                </p>
                {expandedTodos[i] ? (
                  <>
                    <p>
                      <strong>Priority:</strong> {todo.priority}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {todo.deadline}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "15px",
                      }}
                    >
                      <button
                        style={{ marginRight: "10px" }}
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ marginRight: "20px" }}
                        onClick={() => handleDelete(todo)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : null}
                <div style={{ textAlign: "center", marginBottom: "5px" }}>
                  <button onClick={() => handleExpand(i)}>
                    {expandedTodos[i] ? "Hide Details" : "See More Details"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {activeTab === "finished" && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {completed.map((todo, i) => (
              <div key={i} style={todoContainerStyle}>
                <p style={{ textAlign: "center" }}>
                  <strong>{todo.name}</strong>
                </p>
                <p>
                  <strong>Description:</strong> {todo.description}
                </p>
                {expandedTodos[i] ? (
                  <>
                    <p>
                      <strong>Priority:</strong> {todo.priority}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {todo.deadline}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "15px",
                      }}
                    >
                      <button
                        style={{ marginRight: "20px" }}
                        onClick={() => handleMove(todo)}
                      >
                        Move to Todo´s
                      </button>
                      <button
                        style={{ marginRight: "20px" }}
                        onClick={() => handleDelete(todo)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : null}
                <div style={{ textAlign: "center" }}>
                  <button onClick={() => handleExpand(i)}>
                    {expandedTodos[i] ? "Hide Details" : "See More Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {editMode && (
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
              transform: "translate(-50%, -50%)",
              border: "2px solid #4e4e4e",
              borderRadius: "15px",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Edit Todo</h2>
            <p>
              <strong>Name:</strong>
              <input
                style={{ backgroundColor: "#bcbcbc" }}
                type="text"
                value={editedTodo.name}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, name: e.target.value })
                }
              />
            </p>
            <p>
              <strong>Description:</strong>
              <textarea
                style={{ height: "auto", backgroundColor: "#bcbcbc" }}
                value={editedTodo.description}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, description: e.target.value })
                }
              />
            </p>

            <p>
              <strong>Priority:</strong>
              <select
                style={{ backgroundColor: "#bcbcbc" }}
                value={editedTodo.priority}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, priority: e.target.value })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </p>
            <p>
              <strong>Deadline:</strong>
              <input
                style={{ backgroundColor: "#bcbcbc" }}
                type="text"
                value={editedTodo.deadline}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, deadline: e.target.value })
                }
              />
            </p>
            <div style={{ textAlign: "center" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {deleteMode && (
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
              transform: "translate(-50%, -50%)",
              border: "2px solid #4e4e4e",
              borderRadius: "15px",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Delete Todo</h2>
            <p style={{ textAlign: "center" }}>
              Are you sure you want to delete this todo?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <button onClick={handleConfirmDelete}>Delete</button>
              <button onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
