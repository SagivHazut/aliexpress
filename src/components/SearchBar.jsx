import React from "react";

function SearchBar(props) {
  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={props.handleInputChange}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.2s ease-in-out",
          outline: "none",
          fontSize: "16px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          marginTop: "10px",
        }}
      />
    </>
  );
}

export default SearchBar;
