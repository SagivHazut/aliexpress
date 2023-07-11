import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import csvData from "../csv/file.csv";

export const CsvDataReader = () => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvData);
        const csv = await response.text();
        const parsedCsv = Papa.parse(csv, { header: true });
        setParsedData(parsedCsv.data);
      } catch (error) {
        console.error("Error fetching or parsing CSV data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {parsedData.length > 0 ? (
        parsedData.map((item, index) => (
          <div key={index}>
            <p>id: {item.ProductId}</p>
            <p>title: {item["Origin Price"]}</p>
            <p>href: {item["Promotion Url"]}</p>
            <p>description: {item["Product Desc"]}</p>
            <p>imageUrl: {item["Image Url"]}</p>
            <p>Sales180Day: {item["Sales180Day"]}</p>
            <p>Positive Feedback: {item["Positive Feedback"]}</p>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};
