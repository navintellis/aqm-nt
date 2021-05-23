import { Table } from "antd";
import "antd/dist/antd.css";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { formatDataLastUpdated } from "../../utility";
import AQICell from "./sub-component/AQICell";
import AQICityBarGraph from "./sub-component/AQICityBarGraph";
import AQISingleCityGraph from "./sub-component/AQISingleCityGraph";
import HistoryGraph from "./sub-component/HistoryGraph";

export const columns = [
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    width: 1
  },

  {
    title: "AQI",
    key: "aqi",
    dataIndex: "aqi",
    render: (aqi) => <AQICell aqi={aqi} />,
    width: 100
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    width: 100,
    render: (lastUpdated) => formatDataLastUpdated(lastUpdated)
  },
  {
    title: "Live Tracking",
    dataIndex: "history",
    key: "history",
    width: 200,
    render: (history) => <HistoryGraph history={history} />
  }
];

const AQI = ({ data, sourceData, history }) => {
  const [selectedRowKeys, onChangeSelectedRows] = useState([]);
  const [clickedRow, setClickedRow] = useState(false);

  const pagination = {
    total: data.length,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} cities`,
    defaultCurrent: 1,
    defaultPageSize: 15,
    pageSizeOptions: [5, 10, 15],
    showSizeChanger: true
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey={(record) => record.city}
        rowSelection={{
          selectedRowKeys,
          onChange: onChangeSelectedRows
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setClickedRow(record);
            }
          };
        }}
      />
      <AQICityBarGraph sourceData={sourceData} cities={selectedRowKeys} />
      <Modal
        title={clickedRow ? `AQM Live Tracting for ${clickedRow.city}` : null}
        centered
        visible={!!clickedRow}
        onOk={() => setClickedRow(null)}
        onCancel={() => setClickedRow(null)}
        width="95%"
        style={{ top: 20 }}
      >
        {!!clickedRow && <AQISingleCityGraph city={history[clickedRow.city]} />}
      </Modal>
    </>
  );
};

export default AQI;
