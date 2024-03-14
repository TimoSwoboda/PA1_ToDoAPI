import React from "react";

const CategoryBox = ({ text, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(text);
  };

  const getCategoryColor = () => {
    if (isSelected) {
      switch (text) {
        case "Today":
          return "red";
        case "This Week":
          return "blue";
        case "All":
          return "orange";
        case "Done":
          return "green";
        case "Assigned":
          return "purple";
        default:
          return "#474747";
      }
    } else {
      return "#474747";
    }
  };

  return (
    <div
      style={{
        paddingBottom: "70px",
        paddingLeft: "20px",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: getCategoryColor(),
          color: "white",
          borderRadius: "10px",
          height: "320%",
          width: "100%",
          cursor: "pointer",
          fontWeight: "bolder"
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default CategoryBox;