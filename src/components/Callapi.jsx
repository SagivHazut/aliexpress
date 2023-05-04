import React, { useEffect, useState } from "react";
import axios from "axios";

const Callapi = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set up API credentials
        const appKey = "501162";
        const appSecret = "NqsJnOt131sy1ipJoHqG4d5pVyHB1IIk";

        // Set API endpoint URL
        const apiUrl =
          "http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.apiMethod";

        // Set request parameters
        const params = {
          param1: "value1",
          param2: "value2",
          appKey: appKey,
          sign: appSecret,
        };

        // Make the API request
        const response = await axios.get(apiUrl, { params });

        console.log("API request successful");
        console.log(response.data);
      } catch (error) {
        console.error("API request failed", error);
      }
    };

    fetchData();
  }, []);

  return <div>API Request Example</div>;
};
export default Callapi;
