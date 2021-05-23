import React from "react";
import { Tag } from "antd";
import { getColorCodeForAQI } from "../../../utility";

function AQICell({ aqi }) {
  const { color, fontColor } = getColorCodeForAQI(aqi);

  return (
    <Tag color={color} key={aqi}>
      <span style={fontColor}>{Number(aqi).toFixed(2)}</span>
    </Tag>
  );
}

export default React.memo(AQICell);
