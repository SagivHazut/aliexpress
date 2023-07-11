import React, { useState } from "react";
import Item from "./Item";
import Pages from "./Pages";
import SearchBar from "./SearchBar";
import { Category } from "./Category";
import { SearchItems } from "./SearchItems";
import Papa from "papaparse";
import csvData from "../csv/hotdeals.csv";
import { useEffect } from "react";

export const TopProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [name, setName] = useState("Search in Hot Deals....");
  const [showSearchQuery, setShowSearchQuery] = useState(false);
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

  const [items, setItems] = useState([
    {
      id: 1,
      title: "sagiv",
      href: "https://s.click.aliexpress.com/e/_DlTRcst",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      imageUrl:
        "//ae01.alicdn.com/kf/Sa01824c217474fd28ba5eab6ad187a80e.jpg_350x350.jpg",
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
  const itemsPerPage = 12;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowSearchQuery(!showSearchQuery);
  };

  const filteredItems = items.filter((item) => {
    return (
      !search ||
      (item.title && item.title.toLowerCase().includes(search.toLowerCase()))
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
    setSearchQuery(suggestion.title);
  };
  const handleClick = () => {
    setSearch(searchQuery);
    setShowSearchQuery(!showSearchQuery);
  };
  console.log(parsedData);
  return (
    <>
      <div>
        <SearchBar
          handleInputChange={handleInputChange}
          items={filteredItems}
          searchQuery={searchQuery}
          handleSuggestionSelect={handleSuggestionSelect}
          name={name}
          showSearchQuery={showSearchQuery}
          handleClick={handleClick}
        />
        {filteredItems.length > 0 && search ? (
          <div>
            <SearchItems key={filteredItems.id} post={filteredItems} />
          </div>
        ) : (
          <>
            {" "}
            <Item key={visibleItems.id} post={parsedData} />
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
        )}
      </div>
    </>
  );
};
