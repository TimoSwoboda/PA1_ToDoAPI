import React from "react";

const TodoItem = ({ name, description, deadline }) => {
  return (
    <div style={{ lineHeight: "1.0", borderBottom: "1px solid #D0D0D0", marginRight: "25px", marginLeft: "10px" }}>
      <h3 style={{ color: "white" }}>{name}</h3>
      <p style={{ color: "#D0D0D0" }}>{description}</p>
      <p style={{ color: "#D0D0D0" }}>Deadline: {deadline}</p>
    </div>
  );
};

export default TodoItem;