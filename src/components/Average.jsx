import { useState } from "react";
import Item from "./Item";
import Pages from "./Pages";
import SearchBar from "./SearchBar";
import { SearchItems } from "./SearchItems";

export const Average = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemArry, setItemArry] = useState();

  const [items, setItems] = useState([
    {
      name: "hello",
      id: 1,
      title: "sagiv",
      href: "#",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "#",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    // More posts...
  ]);
  const itemsPerPage = 10;
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    return (
      item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  console.log(filteredItems);
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
  return (
    <>
      <div>
        <SearchBar handleInputChange={handleInputChange} />
        {searchQuery && filteredItems.length > 0 ? (
          <div>
            <SearchItems key={filteredItems.id} post={filteredItems} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Item key={visibleItems.id} post={visibleItems} />

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
    </>
  );
};
