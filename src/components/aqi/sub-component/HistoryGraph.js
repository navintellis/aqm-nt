import React from "react";
import { Sparklines, SparklinesBars, SparklinesLine } from "react-sparklines";

function AQICell({ history }) {
  const data = history.map((historyEvent) => historyEvent.aqi);

  return (
    <Sparklines data={data} limit={20}>
      <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
      <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
    </Sparklines>
  );
}

export default React.memo(AQICell);
