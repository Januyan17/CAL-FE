import { Card, Col, Row } from 'antd';
import EChart from '../components/chart/EChart';
import LineChart from '../components/chart/LineChart';

const GraphComponent = () => {
  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
          <Card bordered={false} className="criclebox h-full">
            <LineChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GraphComponent;
