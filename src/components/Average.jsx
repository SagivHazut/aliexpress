import React, { useState } from "react";
import Item from "./Item";
import Pages from "./Pages";
import SearchBar from "./SearchBar";
import { Category } from "./Category";
import { SearchItems } from "./SearchItems";
import Papa from "papaparse";
import csvData from "../csv/featured.csv";
import { useEffect } from "react";

export const Average = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("Search in Hot Deals....");
  // const [showSearchQuery, setShowSearchQuery] = useState(false);
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvData);
        const csv = await response.text();
        const parsedCsv = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        });
        const filteredData = parsedCsv.data.filter((item) =>
          Object.values(item).some((value) => value !== "")
        );
        setParsedData(filteredData);
      } catch (error) {
        console.error("Error fetching or parsing CSV data:", error);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 12;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = parsedData.filter((item) => {
    return (
      !searchQuery ||
      (item["Product Desc"] && item["Product Desc"].toLowerCase && item["Product Desc"].toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });  

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsNumber, setItemsNumber] = useState(parsedData);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const visibleItems = parsedData.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(parsedData.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion["Product Desc"] );
  };


  return (
    <>
      <div>
        <SearchBar
          handleInputChange={handleInputChange}
          items={filteredItems}
          searchQuery={searchQuery}
          handleSuggestionSelect={handleSuggestionSelect}
          name={name}
        />
        {filteredItems.length > 0 && searchQuery ? (
          <div>
            <SearchItems key={filteredItems.id} post={filteredItems} />
          </div>
        ) : (
          <>
            {" "}
            <Item key={visibleItems.id} post={visibleItems} />
            {filteredItems.length > 10 && (
              <Pages
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}
                itemsNumber={parsedData}
                firstItemIndex={firstItemIndex}
                itemsPerPage={itemsPerPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};