import { Divider } from "antd";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { cityColors } from "../../../constants";
import { formatAMPM } from "../../../utility";

function AQICityBarGraph({ sourceData, cities: selectedCities }) {
  const processedData = sourceData.slice(-20).reduce((accumulator, sd) => {
    const accum = [...accumulator];
    const { lastUpdated, cities } = sd;
    const selectedCityData = cities.reduce((accumInput, cityData) => {
      const accum = { ...accumInput };
      const { city, aqi } = cityData;
      accum[city] = Number(aqi).toFixed(2);
      return accum;
    }, {});
    const accumNode = {
      lastUpdated: formatAMPM(new Date(lastUpdated), true),
      ...selectedCityData
    };

    accum.push(accumNode);
    return accum;
  }, []);

  return (
    <>
      <Divider>Compare Live Data for Selected Cities:</Divider>
      {!!selectedCities.length && (
        <ResponsiveContainer width="98%" height={400}>
          <BarChart
            data={processedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lastUpdated" />
            <YAxis />
            <Tooltip />
            <Legend />
            {React.Children.toArray(
              selectedCities.map((city) => (
                <Bar key={city} dataKey={city} fill={cityColors[city]} />
              ))
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
      {!selectedCities.length && (
        <p>
          <i>Please Select atleast one City from the above table.</i>
        </p>
      )}
    </>
  );
}

export default React.memo(AQICityBarGraph);
