const prefixSingleDigitWithZero = (data) => {
  return parseInt(data, 10) < 10 ? "0" + data : data;
};

export const formatAMPM = (date, withSeconds) => {
  let hours = date.getHours();
  const minutes = prefixSingleDigitWithZero(date.getMinutes());

  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let strTime = `${hours}:${minutes}`;
  if (withSeconds) {
    const seconds = prefixSingleDigitWithZero(date.getSeconds());
    strTime += `:${seconds}`;
  }
  strTime += ` ${ampm}`;

  return strTime;
};

export const formatDataLastUpdated = (lastUpdated) => {
  // Get the time difference between current and last updated in minutes
  const timeDifference = Math.floor(
    (Number(new Date()) - lastUpdated) / (1000 * 60)
  );
  let lastUpdatedStr = "";

  switch (true) {
    case timeDifference === 0:
      lastUpdatedStr = "Few Seconds Ago";
      break;
    case timeDifference === 1:
      lastUpdatedStr = "A Minute Ago";
      break;
    case timeDifference < 10:
      lastUpdatedStr = "Few Minutes Ago";
      break;
    default:
      lastUpdatedStr = formatAMPM(new Date(lastUpdated));
      break;
  }

  return lastUpdatedStr;
};

export const getColorCodeForAQI = (aqi) => {
  let color = "";
  let fontColor = { color: "white" };
  const aqiFloor = Math.floor(aqi);
  switch (true) {
    case 0 <= aqiFloor && aqiFloor <= 50:
      color = "#55A850";
      break;
    case 51 <= aqiFloor && aqiFloor <= 100:
      color = "#A3C853";
      fontColor.color = "black";
      break;
    case 101 <= aqiFloor && aqiFloor <= 200:
      color = "#FFF834";
      fontColor.color = "black";
      break;
    case 201 <= aqiFloor && aqiFloor <= 300:
      color = "#F29C33";
      break;
    case 301 <= aqiFloor && aqiFloor <= 400:
      color = "#E93F33";
      break;
    case 401 <= aqiFloor && aqiFloor <= 500:
      color = "#AF2E24";
      break;
    default:
      color = "white";
      fontColor.color = "black";
      break;
  }
  return { color, fontColor };
};

export default {
  formatAMPM,
  formatDataLastUpdated,
  getColorCodeForAQI
};
