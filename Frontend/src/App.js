import CategoryBox from "./CategoryBox";
import React, { useState } from "react";
import GetContent from "./GetContent";


function App() {
  const [selectedCategory, setSelectedCategory] = useState("Today");
  const [showSettings, setShowSettings] = useState(false);
  const [showAdd, setAdd] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleAddClick = () => {
    setAdd(true);
  };

  const handleCloseAdd = () => {
    setAdd(false);
  };


  const renderSettingsContent = () => {
     
      return (
        <div>
          <div>
            <h4>Username:</h4>
            <h4>Email:</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
          </div>
        </div>
      );
    
  };

  return (
    <div
      style={{
        display: "flex", 
        height: "100vh", 
      }}
    >
      <div
        style={{
          width: "325px", 
          backgroundColor: "#1f1f1f", 
          overflowY: "auto",
        }}
      >
        
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              paddingRight: "20px",
              paddingTop: "15px",
            }}
          >
            <CategoryBox
              text="Today"
              isSelected={selectedCategory === "Today"}
              onClick={() => handleCategoryClick("Today")}
            />
            <CategoryBox
              text="This Week"
              isSelected={selectedCategory === "This Week"}
              onClick={() => handleCategoryClick("This Week")}
            />
            <CategoryBox
              text="All"
              isSelected={selectedCategory === "All"}
              onClick={() => handleCategoryClick("All")}
            />
            <CategoryBox
              text="Done"
              isSelected={selectedCategory === "Done"}
              onClick={() => handleCategoryClick("Done")}
            />
          </div>
        </div>
        <div
          style={{
            color: "white",
            paddingLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>My Lists</h3>
          <button style={{ marginLeft: "auto", marginRight: "20px" }}>
            New List
          </button>
        </div>
      </div>

      <div style={{ flex: "4", backgroundColor: "#2a2a2a", overflowY: "auto" }}>
      <GetContent selectedCategory={selectedCategory} />
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "40px",
        }}
        onClick={handleAddClick}
      >
        Add
      </button>
      {showSettings && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "325px",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: "#1f1f1f",
              color: "white",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              paddingTop: "",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2 style={{ marginRight: "auto" }}>Settings</h2>
              <button onClick={handleCloseSettings}>Close</button>
            </div>
            {renderSettingsContent()}
          </div>
        </div>
      )}
      {showAdd && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      width: "50%",
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
    <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
      Create New Todo
    </h3>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.5fr 2fr",
        gap: "10px",
        width: "100%",
      }}
    >
      <div>
        <label>Name:</label>
      </div>
      <div>
        <input type="text" style={{ width: "100%" }} />
      </div>
      <div>
        <label>Description:</label>
      </div>
      <div>
        <input type="text" style={{ width: "100%" }} />
      </div>
      <div>
        <label>Deadline:</label>
      </div>
      <div>
        <input type="date" />
      </div>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        gap: "10px",
      }}
    >
      <button>Create</button>
      <button onClick={handleCloseAdd}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
}

export default App;
