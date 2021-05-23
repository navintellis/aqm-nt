import AQI from "../../components/aqi";
import { useCitiesAQI } from "../../components/aqi/aqi-hooks";

function AQICities() {
  const { data, history, sourceData } = useCitiesAQI();

  return <AQI data={data} history={history} sourceData={sourceData} />;
}

export default AQICities;
