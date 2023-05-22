import React, { useEffect, useState } from "react";

function SearchBar(props) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const filteredSuggestions = props.items.filter((item) => {
      const productDesc = item["Product Desc"] || ""; 
      return productDesc.toLowerCase().includes(props.searchQuery.toLowerCase());
    });
    setSuggestions(filteredSuggestions.slice(0, 7));
  }, [props.items, props.searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    props.handleSuggestionSelect(suggestion);
  };

  return (
    <>
      <input
        type="text"
        placeholder={props.name}
        value={props.searchQuery}
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

      {props.searchQuery &&
        suggestions.length > 0 &&
       (
          <ul
            style={{
              listStyle: "none",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.2s ease-in-out",
              fontSize: "16px",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              marginTop: "10px",
              backgroundColor: "#fff",
            }}
          >
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSuggestionClick(item)}
                style={{ cursor: "pointer" }}
              >
                {item["Product Desc"]
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")}
                {props.searchQuery && suggestions.length > 1 && (
                  <div class="flex justify-center">
                    <hr class="border-1 border-gray-300 my-2 w-40 mx-auto" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
    </>
  );
}

export default SearchBar;
