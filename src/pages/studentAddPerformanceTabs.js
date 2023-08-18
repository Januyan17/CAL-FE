import { Card, Col, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import Gpa from './studentsAddPerformance/gpa';
import SelfLearning from './studentsAddPerformance/selfLearning';
import Club from './studentsAddPerformance/club';
import Event from './studentsAddPerformance/events';
import Sport from './studentsAddPerformance/sport';

const StudentPerformanceTabs = () => {
  const [tab, setTab] = useState('2');

  useEffect(() => {
    let url = window.location.href;
    const splittedURL = url.split('/')[4];

    console.log(splittedURL, 'uerll');
    if (splittedURL === 'gpa') {
      setTab('1');
    } else if (splittedURL === 'selfLearning') {
      setTab('2');
    } else if (splittedURL === 'club') {
      setTab('4');
    } else if (splittedURL === 'event') {
      setTab('5');
    } else if (splittedURL === 'sport') {
      setTab('3');
    }
  }, []);

  const handleTabs = (key) => {
    setTab(key);
  };
  return (
    <Row gutter={[24, 0]}>
      <Col xs={24} className="mb-24">
        <Card
          className="header-solid h-full ant-card-p-0"
          title={
            <>
              <Row
                gutter={[24, 0]}
                className="ant-row-flex ant-row-flex-middle"
              >
                <Col xs={24} md={12}>
                  <Tabs onChange={handleTabs} activeKey={tab}>
                    <Tabs.TabPane tab="GPA" key="1">
                      <Gpa />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Self Learning" key="2">
                      <SelfLearning />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Sport" key={3}>
                      <Sport />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Club" key={4}>
                      <Club />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Events" key={5}>
                      {' '}
                      <Event />
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </>
          }
        ></Card>
      </Col>
    </Row>
  );
};

export default StudentPerformanceTabs;
