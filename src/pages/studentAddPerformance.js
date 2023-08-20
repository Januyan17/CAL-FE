import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Table,
  DatePicker,
  TimePicker,
  ConfigProvider,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  createAD,
  deleteAd,
  getAllAds,
  initailizeAd,
  updateAd,
} from '../redux/action';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import GpaSVG from './Icons/gpaSVG';
import GpaIcon from './Icons/gpaIcon';
import SelfIcon from './Icons/selfLearningIcon';
import SportIcon from './Icons/sportsIcon';
import ClubIcon from './Icons/clubIcon';
import EventIcon from './Icons/eventIcon';
import BannerIcon from './Icons/studentBannerIcon';
import Banner2Icon from './Icons/banner2Icon';

const StudentAddPerformance = () => {
  const history = useHistory();

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
                <Col xs={24} md={12}></Col>
              </Row>
            </>
          }
        >
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'Poppins',
                backgroundColor: 'white',
              },
            }}
          >
            <div style={{ fontFamily: 'Poppins !important' }}>
              <Row>
                <Col>
                  <span
                    style={{
                      color: '#070C83',
                      fontSize: '16px',
                      fontWeight: 400,
                    }}
                  >
                    Hey There,
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span
                    style={{
                      color: '#070C83',
                      fontSize: '20px',
                      fontWeight: 700,
                    }}
                  >
                    Come let’s analyze your Performance!
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p
                    style={{
                      color: '#070C83',
                      fontSize: '15px',
                      fontWeight: 500,
                    }}
                  >
                    It may take some time to achieve your goals, but eventually,
                    you will. So be patient and work hard for your dreams, and
                    they will come to you.It may take some time to achieve your
                    goals, but eventually, you will. So be patient and work hard
                    for your dreams, and they will come to you.It may take some
                    time to achieve your goals, but eventually, you will. So be
                    patient and work hard for your dreams, and they will come to
                    you.
                  </p>
                </Col>
              </Row>
              {/* <div style={{ fontFamily: 'Poppins !important', left: 0 }}> */}
              {/* ... */}
              <Row style={{ marginLeft: '100px', marginTop: '50px' }}>
                <div
                  onClick={() => history.push('/addPerformance/gpa')}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block', // Ensures the containers stack horizontally
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                      <GpaSVG />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        marginLeft: '47px',
                        marginTop: '10px',
                        zIndex: 1, // To bring the GpaIcon forward
                      }}
                    >
                      <GpaIcon />
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '10px',
                          marginTop: '110px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <span
                          style={{
                            color: '#070C83',
                            fontWeight: 700,
                            fontSize: '20px',
                          }}
                        >
                          GPA
                        </span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '-29px',
                          marginTop: '179px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <Button
                          onClick={() => history.push('/addPerformance/gpa')}
                          style={{ height: '40px', width: '105px' }}
                        >
                          {' '}
                          view
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => history.push('/addPerformance/selfLearning')}
                  style={{
                    marginLeft: '200px',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block', // Ensures the containers stack horizontally
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                      <GpaSVG />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        marginLeft: '47px',
                        marginTop: '10px',
                        zIndex: 1, // To bring the GpaIcon forward
                      }}
                    >
                      <SelfIcon />
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '10px',
                          marginTop: '110px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <span
                          style={{
                            color: '#070C83',
                            fontWeight: 700,
                            fontSize: '20px',
                          }}
                        >
                          Self
                        </span>

                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            marginLeft: '-18px',
                            marginTop: '18px',
                            zIndex: 1, // To bring the GpaIcon forward
                          }}
                        >
                          <span
                            style={{
                              color: '#070C83',
                              fontWeight: 700,
                              fontSize: '20px',
                            }}
                          >
                            Learning
                          </span>
                        </div>

                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            marginLeft: '-34px',
                            marginTop: '69px',
                            zIndex: 1, // To bring the GpaIcon forward
                          }}
                        >
                          <Button
                            onClick={() =>
                              history.push('/addPerformance/selfLearning')
                            }
                            style={{ height: '40px', width: '105px' }}
                          >
                            {' '}
                            view
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => history.push('/addPerformance/sport')}
                  style={{
                    marginLeft: '200px',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block', // Ensures the containers stack horizontally
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                      <GpaSVG />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        marginLeft: '47px',
                        marginTop: '10px',
                        zIndex: 1, // To bring the GpaIcon forward
                      }}
                    >
                      <SportIcon />
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '0px',
                          marginTop: '110px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <span
                          style={{
                            color: '#070C83',
                            fontWeight: 700,
                            fontSize: '20px',
                          }}
                        >
                          Sports
                        </span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '-29px',
                          marginTop: '179px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <Button
                          onClick={() => history.push('/addPerformance/sport')}
                          style={{ height: '40px', width: '105px' }}
                        >
                          {' '}
                          view
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => history.push('/addPerformance/club')}
                  style={{
                    marginLeft: '200px',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block', // Ensures the containers stack horizontally
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                      <GpaSVG />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        marginLeft: '47px',
                        marginTop: '10px',
                        zIndex: 1, // To bring the GpaIcon forward
                      }}
                    >
                      <ClubIcon />
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '0px',
                          marginTop: '110px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <span
                          style={{
                            color: '#070C83',
                            fontWeight: 700,
                            fontSize: '20px',
                          }}
                        >
                          Club
                        </span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '-29px',
                          marginTop: '179px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <Button
                          onClick={() => history.push('/addPerformance/club')}
                          style={{ height: '40px', width: '105px' }}
                        >
                          {' '}
                          view
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => history.push('/addPerformance/event')}
                  style={{
                    marginLeft: '200px',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block', // Ensures the containers stack horizontally
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                      <GpaSVG />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        marginLeft: '47px',
                        marginTop: '10px',
                        zIndex: 1, // To bring the GpaIcon forward
                      }}
                    >
                      <EventIcon />
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '0px',
                          marginTop: '110px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <span
                          style={{
                            color: '#070C83',
                            fontWeight: 700,
                            fontSize: '20px',
                          }}
                        >
                          Events
                        </span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          marginLeft: '-29px',
                          marginTop: '179px',
                          zIndex: 1, // To bring the GpaIcon forward
                        }}
                      >
                        <Button
                          onClick={() => history.push('/addPerformance/event')}
                          style={{ height: '40px', width: '105px' }}
                        >
                          {' '}
                          view
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

              <div
                style={{
                  marginTop: '400px',
                  marginLeft: '80px',
                  marginBottom: '200px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-block', // Ensures the containers stack horizontally
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0 }}>
                    <BannerIcon />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      marginLeft: '47px',
                      marginTop: '13px',
                      zIndex: 1, // To bring the GpaIcon forward
                    }}
                  >
                    <Banner2Icon />

                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        marginLeft: '28px',
                        marginTop: '20px',
                        zIndex: 1, // To bring the GpaIcon forward
                      }}
                    >
                      <span
                        style={{
                          color: '#000000',
                          fontWeight: 500,
                          fontSize: '15px',
                        }}
                      >
                        Always set realistic goals and things to do in your day.
                        Make a list and force yourself to do it. This will help
                        you with deadlines, and your studies will never pile up.
                        Always say “I can do it” to yourself, and believe me,
                        you will.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <XmlBasedSvgComponent /> */}

              {/* </div> */}
            </div>
          </ConfigProvider>
        </Card>
      </Col>
    </Row>
  );
};

export default StudentAddPerformance;
