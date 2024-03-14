import { TodoContainerStyle } from "./TodoItemContainer";
import { useState } from "react";

function GetContent({ selectedCategory }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = (todo) => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  
  const renderConfirmationModal = () => {
    if (showConfirmation) {
      return (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#383838",
            color: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            border: "1px solid #808080",
            boxShadow: "0 0 10px #808080",
          }}
        >
          <h3>Are you sure you want to delete this?</h3>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      );
    }
  };

  const TodayTodoItems = [
    {
      name: "Do Laundry",
      description: "Wash and fold clothes",
      deadline: "2024-03-14",
    },
    {
      name: "Grocery Shopping",
      description: "Buy fruits, vegetables, and milk",
      deadline: "2024-03-14",
    },
  ];

  const ThisWeekTodoItems = [
    {
      name: "Submit Project Report",
      description: "Finalize and submit the project report",
      deadline: "2024-03-18",
    },
    {
      name: "Prepare Presentation",
      description: "Prepare slides for the team presentation",
      deadline: "2024-03-17",
    },
  ];

  const DoneTodoItems = [
    {
      name: "Finish Project Presentation",
      description: "Prepare and deliver final project presentation",
      deadline: "2024-03-20",
    },
    {
      name: "Submit Final Report",
      description: "Submit the final project report to the supervisor",
      deadline: "2024-03-22",
    },
  ];

  const allTodoItems = [...TodayTodoItems, ...ThisWeekTodoItems, ...DoneTodoItems];

  switch (selectedCategory) {
    case "Today":
      return (
        <div>
          <h2 style={{ color: "red", paddingLeft: "20px" }}>Today</h2>
          {TodayTodoItems.map((todo, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginLeft: "10px" }} />
              <div style={{ ...TodoContainerStyle, flex: 1, paddingBottom: "10px" }}>
                <h4 style={{ color: "white" }}>{todo.name}</h4>
                <p style={{ color: "#D0D0D0", marginBottom: "5px" }}>{todo.description}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ color: "#D0D0D0", marginRight: "10px", marginBottom: "0" }}>Deadline: {todo.deadline}</p>
                  <div style={{ marginLeft: "auto" }}>
                    <button style={{ marginRight: "10px" }}>Edit</button>
                    <button style={{ marginRight: "10px" }} onClick={() => handleDelete(todo)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {renderConfirmationModal()}
        </div>
      );
      case "This Week":
        return (
          <div>
            <h2 style={{ color: "blue", paddingLeft: "20px" }}>This Week</h2>
            {ThisWeekTodoItems.map((todo, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" style={{ marginLeft: "10px" }} />
                <div style={{ ...TodoContainerStyle, flex: 1, paddingBottom: "10px" }}>
                  <h4 style={{ color: "white" }}>{todo.name}</h4>
                  <p style={{ color: "#D0D0D0", marginBottom: "5px" }}>{todo.description}</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ color: "#D0D0D0", marginRight: "10px", marginBottom: "0" }}>Deadline: {todo.deadline}</p>
                    <div style={{ marginLeft: "auto" }}>
                      <button style={{ marginRight: "10px" }}>Edit</button>
                      <button style={{ marginRight: "10px" }} onClick={() => handleDelete(todo)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {renderConfirmationModal()}
          </div>
        );
    case "All":
      return (
        <div>
          <h2
            style={{
              color: "orange",
              paddingLeft: "35px",
              position: "sticky",
              top: 0,
              backgroundColor: "#2a2a2a",
            }}
          >
            All
          </h2>
          <>
            {allTodoItems.map((todo, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input type="checkbox" style={{ marginLeft: "10px" }} />
                <div
                  style={{
                    ...TodoContainerStyle,
                    flex: 1,
                    paddingBottom: "10px",
                  }}
                >
                  <h4 style={{ color: "white" }}>{todo.name}</h4>
                  <p style={{ color: "#D0D0D0", marginBottom: "5px" }}>
                    {todo.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p
                      style={{
                        color: "#D0D0D0",
                        marginRight: "10px",
                        marginBottom: "0",
                      }}
                    >
                      Deadline: {todo.deadline}
                    </p>
                    <div style={{ marginLeft: "auto" }}>
                      <button style={{ marginRight: "10px" }}>Edit</button>
                      <button style={{ marginRight: "10px" }} onClick={() => handleDelete(todo)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {renderConfirmationModal()}
          </>
        </div>
      );

      case "Done":
        return (
          <div>
            <h2 style={{ color: "green", paddingLeft: "20px" }}>Completed</h2>
            {DoneTodoItems.map((todo, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" style={{ marginLeft: "10px" }} />
                <div style={{ ...TodoContainerStyle, flex: 1, paddingBottom: "10px" }}>
                  <h4 style={{ color: "white" }}>{todo.name}</h4>
                  <p style={{ color: "#D0D0D0", marginBottom: "5px" }}>{todo.description}</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ color: "#D0D0D0", marginRight: "10px", marginBottom: "0" }}>Deadline: {todo.deadline}</p>
                    <div style={{ marginLeft: "auto" }}>
                      <button style={{ marginRight: "10px" }}>Edit</button>
                      <button style={{ marginRight: "10px" }} onClick={() => handleDelete(todo)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
           {renderConfirmationModal()}
          </div>
        );
    
      default:
        return null;
    }
}
export default GetContent;
