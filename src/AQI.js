import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import { columns } from "aqi-config";

const AQI = (data) => {
  return <Table columns={columns} dataSource={data} />;
};
