import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { formatAMPM, getColorCodeForAQI } from "../../../utility";

function AQISingleCityGraph({ city }) {
  const processedData = city.map(({ lastUpdated, aqi }) => {
    return {
      lastUpdated: formatAMPM(new Date(lastUpdated), true),
      aqi: Number(aqi).toFixed(2)
    };
  });

  return (
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
        <YAxis dataKey="aqi" domain={["dataMin - 1", "dataMax + 5"]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="aqi">
          {React.Children.toArray(
            processedData.map((entry, index) => (
              <Cell
                key={"aqi" + index}
                fill={getColorCodeForAQI(entry.aqi).color}
              />
            ))
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default React.memo(AQISingleCityGraph);
