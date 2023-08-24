import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  return (
    <>
      <div
        style={{ color: "#070C83", fontWeight: 600, fontSize: "30px" }}
        id="chart"
      >
        Come Join with us!
      </div>
      <div
        className="chart-vistior"
        style={{ color: "#070C83", fontWeight: 600, fontSize: "15px" }}
      >
        {/* <Title level={5}>Active Users</Title> */}
        <Paragraph
          className="lastweek"
          style={{ color: "#070C83", fontWeight: 600, fontSize: "15px" }}
        >
          It may take some time to achieve your goals, but eventually, you will.
          So be patient and work hard for your dreams, and they will come to
          you.
        </Paragraph>
      </div>
    </>
  );
}

export default EChart;
