import React, { useState } from "react";
import Item from "./Item";
import Pages from "./Pages";
import SearchBar from "./SearchBar";
import { Category } from "./Category";
import { SearchItems } from "./SearchItems";
import Callapi from "./Callapi";

export const TopProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      title: "sagiv",
      href: "https://google.com",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
    },
    {
      id: 2,
      title: "roni",
      href: "https://www.amazon.com/Mammoth-Flossy-Chews-Color-Rope/dp/B0017JG2NC?_encoding=UTF8&pd_rd_w=jMMeu&content-id=amzn1.sym.f7e97c7d-82c2-493b-a944-76d3781d5042&pf_rd_p=f7e97c7d-82c2-493b-a944-76d3781d5042&pf_rd_r=P9DWEBMX9RX1GHX13VJ0&pd_rd_wg=Ye3uZ&pd_rd_r=19893aa9-60a7-45c7-a890-e1a67dae8d05&th=1&linkCode=li2&tag=sport01e3-20&linkId=19ffeb0d161cb34a4ac693d42eb80797&language=en_US&ref_=as_li_ss_il",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0017JG2NC&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=sport01e3-20&language=en_US",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
    },
    // More posts...
  ]);
  const itemsPerPage = 10;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    return (
      !searchQuery ||
      (item.title &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsNumber, setItemsNumber] = useState(items);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const visibleItems = items.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);

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
    setSearchQuery(suggestion.title); // Clear the search query after completion if desired
  };
  return (
    <>
      <div>
        <SearchBar
          handleInputChange={handleInputChange}
          items={filteredItems}
          searchQuery={searchQuery}
          handleSuggestionSelect={handleSuggestionSelect}
        />
        {searchQuery && filteredItems.length > 0 ? (
          <div>
            <SearchItems key={filteredItems.id} post={filteredItems} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Item key={visibleItems.id} post={visibleItems} />
      <Callapi />
      {filteredItems.length > 10 && (
        <Pages
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          handlePreviousClick={handlePreviousClick}
          handleNextClick={handleNextClick}
          itemsNumber={itemsNumber}
          firstItemIndex={firstItemIndex}
          itemsPerPage={itemsPerPage}
        />
      )}
    </>
  );
};
