import { useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import { cityColors } from "../../constants";

export function useCitiesAQI() {
  const [data, setData] = useState({});
  const [history, setHistory] = useState({});
  const [sourceData, setSourceData] = useState([]);
  const colors = useRef(cityColors);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket("wss://city-ws.herokuapp.com/‌");

    // Connection opened
    socket.addEventListener("open", function (event) {
      socket.send("Hello Server!");
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      // console.log("Message from server ", event.data);

      try {
        const cities = JSON.parse(event.data);
        const lastUpdated = Number(new Date());
        const enhancedData = cities.reduce(
          (accumulator, cityData) => {
            const accum = cloneDeep(accumulator);
            const { data, history } = accum;
            const { city, aqi } = cityData;
            history[city] = history[city] || [];
            history[city].push({ aqi, lastUpdated });
            data[city] = {
              ...data[city],
              ...cityData,
              lastUpdated,
              history: history[city]
            };
            return accum;
          },
          { data: {}, history: cloneDeep(history) }
        );

        setData((d) => ({ ...d, ...enhancedData.data }));
        setHistory((h) => ({ ...h, ...enhancedData.history }));
        setSourceData((sd) => {
          const copySourceData = [...sd];
          copySourceData.push({
            lastUpdated,
            cities
          });
          return copySourceData;
        });
      } catch (error) {
        console.error("Unable to parse data", error);
      }
    });

    return () => {
      socket.close();
    };
  }, [history]);

  return { data: Object.values(data), history, sourceData };
}

export default {
  useCitiesAQI
};
