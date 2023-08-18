/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from 'react';

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Modal,
  Select,
  Input,
} from 'antd';

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';

import BgProfile from '../assets/images/bg-profile.jpg';
import profilavatar from '../assets/images/face-1.jpg';
import convesionImg from '../assets/images/face-3.jpg';
import convesionImg2 from '../assets/images/face-4.jpg';
import convesionImg3 from '../assets/images/face-5.jpeg';
import convesionImg4 from '../assets/images/face-6.jpeg';
import convesionImg5 from '../assets/images/face-2.jpg';
import project1 from '../assets/images/home-decor-1.jpeg';
import project2 from '../assets/images/home-decor-2.jpeg';
import project3 from '../assets/images/home-decor-3.jpeg';
import {
  deleteStu,
  getProfileDetails,
  makeDeafultProfiles,
  updateProfileDetails,
  updateProfilePicDetails,
  updateStu,
} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import GpaEdit from './studentPerformanceEdit/gpa';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import UpdateProfile from './updateProfile';

function Profile() {
  const dispatch = useDispatch();

  const [clubData, setClubData] = useState([]);
  const [selfLearningData, setSelfLearningData] = useState([]);
  const [sportData, setSportData] = useState([]);

  const [eventData, setEventData] = useState([]);

  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [profileDataValue, setProfileData] = useState({});
  const [updateProfilePicStatusModal, setUpdateProfilePicStatus] =
    useState(false);

  const [openUpdateProfileInfoStatus, setUpdateInfoStatus] = useState(false);

  const [fileVal, setFile] = useState([]);
  const [picErrorStatus, setErrorStaus] = useState(false);

  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);

  const profileData = useSelector(
    (state) => state?.studentReducer?.profileData
  );
  const profileStatus = useSelector(
    (state) => state?.studentReducer?.profileStatus
  );

  const updateProfileInfoStatus = useSelector(
    (state) => state?.studentReducer?.updateProfileInfoStatus
  );

  const deleteStuStatus = useSelector(
    (state) => state?.studentReducer?.deleteStuStatus
  );

  const updateStuStatus = useSelector(
    (state) => state?.studentReducer?.updateStuStatus
  );

  const updateProfilePicStatus = useSelector(
    (state) => state?.studentReducer?.updateProfilePicStatus
  );

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(false);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const handleFile = ({ fileList }) => {
    console.log(fileList);
    setFile([...fileList]);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const hideModal = () => {
    setUpdateInfoStatus(false);
  };

  useEffect(() => {
    if (updateStuStatus) {
      Swal.fire({
        title: `updated successfully`,
        // text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    } else if (updateStuStatus === false) {
      Swal.fire({
        title: `error when updating`,
        // text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }

    makeDeafultProfiles(dispatch);
  }, [updateStuStatus]);

  useEffect(() => {
    if (deleteStuStatus) {
      Swal.fire({
        title: `deleted successfully`,
        // text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    } else if (deleteStuStatus === false) {
      Swal.fire({
        title: `error when deleting`,
        // text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }

    makeDeafultProfiles(dispatch);
  }, [deleteStuStatus]);
  useEffect(() => {
    if (updateProfilePicStatus) {
      Swal.fire({
        title: `Profile picture has been updated successfully`,
        // text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      makeDeafultProfiles(dispatch);
    } else if (updateProfilePicStatus === false) {
      Swal.fire({
        title: `Error while updating profile picture`,
        // text: "You won't be able to revert this!",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      makeDeafultProfiles(dispatch);
    }
  }, [updateProfilePicStatus]);

  useEffect(() => {
    if (updateProfileInfoStatus) {
      Swal.fire({
        title: `Profile Information has been updated successfully`,
        // text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      makeDeafultProfiles(dispatch);
    } else if (updateProfileInfoStatus === false) {
      Swal.fire({
        title: `Error while updating profile Information`,
        // text: "You won't be able to revert this!",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      makeDeafultProfiles(dispatch);
    }
  }, [updateProfileInfoStatus]);

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: '#000' }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    {
      title: 'Sophie B.',
      avatar: convesionImg,
      description: 'Hi! I need more information…',
    },
    {
      title: 'Anne Marie',
      avatar: convesionImg2,
      description: 'Awesome work, can you…',
    },
    {
      title: 'Ivan',
      avatar: convesionImg3,
      description: 'About files I can…',
    },
    {
      title: 'Peterson',
      avatar: convesionImg4,
      description: 'Have a great afternoon…',
    },
    {
      title: 'Nick Daniel',
      avatar: convesionImg5,
      description: 'Hi! I need more information…',
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: 'Project #1',
      title: 'Modern',
      disciption:
        'As Uber works through a huge amount of internal management turmoil.',
    },
    {
      img: project2,
      titlesub: 'Project #2',
      title: 'Scandinavian',
      disciption:
        'Music is something that every person has his or her own specific opinion about.',
    },
    {
      img: project3,
      titlesub: 'Project #3',
      title: 'Minimalist',
      disciption:
        'Different people have different taste, and various types of music, Zimbali Resort',
    },
  ];

  useEffect(() => {
    makeDeafultProfiles(dispatch);
    getProfileDetails(dispatch);
  }, []);

  useEffect(() => {
    if (profileStatus === true) {
      if (profileData?.image) {
        console.log(profileData?.image?.data, 'kkk');
        const buffer = Buffer.from(profileData?.image?.data);
        console.log(buffer, 'kkk');
        const blob = new Blob([buffer], {
          type: 'image/jpeg',
        });

        const imageUrl = URL.createObjectURL(blob);
        setProfileImgUrl(imageUrl);
      } else {
        setProfileImgUrl(null);
      }
      setProfileData(profileData);

      let clubArray = profileData.clubs.map((club) => ({ ...club }));
      let selfLearning = profileData.selflearnings.map((club) => ({ ...club }));
      let events = profileData.events.map((club) => ({ ...club }));
      let sports = profileData.sports.map((club) => ({ ...club }));

      setClubData(clubArray);
      setSelfLearningData(selfLearning);
      setEventData(events);
      setSportData(sports);
    } else if (profileStatus === false) {
      setProfileData({});
      setProfileImgUrl(null);
    }
  }, [profileStatus]);

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: 'url(' + BgProfile + ')' }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: 'none' }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  shape="square"
                  src={profileImgUrl ? profileImgUrl : profilavatar}
                />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {profileDataValue?.first_name} {profileDataValue?.last_name}
                  </h4>
                  <p>{profileDataValue?.role?.role_name || ''}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  setErrorStaus(false);
                  setFile([]);
                  setUpdateProfilePicStatus(true);
                }}
              >
                Update profile Picture
              </Button>
            </Col>
            {/* <Col
              span={24}
              md={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group>
            </Col> */}
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        {/* <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  APPLICATION
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col> */}
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              <Button type="link" onClick={() => setUpdateInfoStatus(true)}>
                {pencil}
              </Button>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            {/* <p className="text-dark">
              {' '}
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).{' '}
            </p>
            <hr className="my-25" /> */}
            <Descriptions
              title={`${profileDataValue?.first_name} ${profileDataValue?.last_name}`}
            >
              <Descriptions.Item label="Full Name" span={3}>
                {profileDataValue?.first_name} {profileDataValue?.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone numbers" span={3}>
                {profileDataValue?.phone_num1}{' '}
                {profileDataValue?.phone_num2 || ''}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {profileDataValue?.email || ''}
              </Descriptions.Item>
              <Descriptions.Item label="Department" span={3}>
                {profileDataValue?.department || ''}
              </Descriptions.Item>
              <Descriptions.Item label="University" span={3}>
                {profileDataValue?.university || ''}
              </Descriptions.Item>

              {profileDataValue?.year && (
                <Descriptions.Item label="Year" span={3}>
                  {profileData?.year}
                </Descriptions.Item>
              )}

              {profileDataValue?.index_no && (
                <Descriptions.Item label="Index No" span={3}>
                  {profileDataValue?.index_no}
                </Descriptions.Item>
              )}

              {/* <Descriptions.Item label="Location" span={3}>
                USA
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: '#344e86' }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: '#e1306c' }} />}
                </a>
              </Descriptions.Item> */}
            </Descriptions>
          </Card>
        </Col>
        {/* <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Conversations</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col> */}

        {profileDataValue &&
        profileDataValue.gpas &&
        profileDataValue.gpas.length ? (
          <Col span={24} md={12} className="mb-24">
            <Card
              bordered={false}
              title={<h6 className="font-semibold m-0">GPA</h6>}
              className="header-solid h-full"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
              <Descriptions
                title={`Your Current GPA is ${profileDataValue.gpas[0]?.value}`}
                span={3}
              ></Descriptions>

              <GpaEdit score={profileDataValue.gpas[0]?.value} />
            </Card>
          </Col>
        ) : (
          <></>
        )}
      </Row>
      {/* <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Projects</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card> */}

      {clubData && clubData?.length ? (
        <Card
          bordered={false}
          className="header-solid mb-24"
          title={
            <>
              <h6 className="font-semibold">Clubs</h6>
              {/* <p>Architects design houses</p> */}
            </>
          }
        >
          <Row gutter={[24, 24]}>
            {/* {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))} */}

            {clubData &&
              clubData.map((p, index) => (
                <Col span={24} md={24} xl={8} key={index}>
                  {console.log(p, 'test')}

                  <Card bordered={false} className="card-project">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Club Name
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '90px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Input
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...clubData];
                                  clubDataVal[index].club_name = e.target.value;
                                  setClubData(clubDataVal);
                                }
                              }}
                              value={p?.club_name}
                              style={{ width: '300px' }}
                              // onChange={(e) => setName(e.target.value)}
                              // value={des}
                              //   style={{ height: '150px' }}
                              // onChange={(e) => setDesc(e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Position
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '80px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              style={{ width: '300px' }}
                              defaultValue="member"
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...clubData];
                                  clubDataVal[index].club_level = e;
                                  setClubData(clubDataVal);
                                }
                              }}
                              value={p?.club_level}
                              options={[
                                { value: 'president', label: 'president' },
                                { value: 'lead', label: 'lead' },
                                { value: 'member', label: 'member' },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <div style={{ height: '20px' }}></div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '40px' }}></div>
                          </td>
                          {/* <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Select a File
                            </span>
                          </td> */}
                          {/* <td>
                            <div style={{ width: '90px' }}></div>
                          </td> */}

                          {/* <td style={{ textAlign: 'left', width: '600px' }}>
                            <Dragger
                              fileList={fileVal}
                              maxCount={1}
                              multiple={false}
                              onChange={handleFile}
                              customRequest={dummyRequest}
                              //   onChange={handleFile}
                            >
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p
                                className="ant-upload-text"
                                style={{
                                  color: '#070C83',
                                  fontWeight: 600,
                                  fontSize: '10px',
                                }}
                              >
                                Click or drag file to this area to upload
                              </p>
                            </Dragger>
                          </td> */}
                        </tr>
                      </tbody>
                    </table>
                    {console.log(
                      profileDataValue.clubs[index]?.club_name,
                      clubData[index].club_name
                    )}

                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ width: '50px' }}></div>
                            </td>
                            {profileDataValue &&
                              clubData &&
                              (profileDataValue.clubs[index]?.club_name !==
                                clubData[index].club_name ||
                                profileDataValue.clubs[index].club_level !==
                                  clubData[index].club_level) &&
                              !(
                                clubData[index].club_name == '' ||
                                clubData[index].club_level == ''
                              ) && (
                                <td style={{ textAlign: 'left' }}>
                                  <Button
                                    onClick={(e) => {
                                      updateStu(
                                        {
                                          type: 'CLUBS',
                                          club_level: p.club_level,
                                          club_name: p.club_name,
                                          id: p.id,
                                        },
                                        dispatch
                                      );
                                    }}
                                    style={{
                                      background:
                                        'linear-gradient(to right, #000AF3, #69D0F0)', // Replace with your desired gradient colors
                                      border: 'none',
                                      color: 'white',
                                      width: '150px',
                                    }}
                                  >
                                    Update
                                  </Button>
                                </td>
                              )}
                            <td>
                              <div style={{ width: '20px' }}></div>
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  deleteStu(
                                    {
                                      type: 'CLUBS',
                                      id: p.id,
                                    },
                                    dispatch
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </Card>
      ) : (
        <></>
      )}

      {eventData && eventData?.length ? (
        <Card
          bordered={false}
          className="header-solid mb-24"
          title={
            <>
              <h6 className="font-semibold">Events</h6>
              {/* <p>Architects design houses</p> */}
            </>
          }
        >
          <Row gutter={[24, 24]}>
            {/* {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))} */}

            {eventData &&
              eventData.map((p, index) => (
                <Col span={24} md={24} xl={8} key={index}>
                  <Card bordered={false} className="card-project">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Name
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '90px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Input
                              value={p?.event_name}
                              style={{ width: '300px' }}
                              onChange={(e) => {
                                let clubDataVal = [...eventData];
                                clubDataVal[index].event_name = e.target.value;
                                setEventData(clubDataVal);
                              }}
                              // value={des}
                              //   style={{ height: '150px' }}
                              // onChange={(e) => setDesc(e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Level
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '100px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              style={{ width: '300px' }}
                              defaultValue="university"
                              value={p?.level}
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...eventData];
                                  clubDataVal[index].level = e;
                                  setEventData(clubDataVal);
                                }
                              }}
                              options={[
                                {
                                  value: 'university',
                                  label: 'university level',
                                },
                                { value: 'national', label: 'national level' },
                                {
                                  value: 'international',
                                  label: 'international level',
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              position
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '80px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              value={p?.position}
                              style={{ width: '300px' }}
                              defaultValue="1"
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...eventData];
                                  clubDataVal[index].position = e;
                                  setEventData(clubDataVal);
                                }
                              }}
                              options={[
                                {
                                  value: '1',
                                  label: '1',
                                },
                                { value: '2', label: '2' },
                                {
                                  value: '3',
                                  label: '3',
                                },
                                {
                                  value: 'part',
                                  label: 'part',
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '30px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Cardinality
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '80px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              style={{ width: '300px' }}
                              value={p?.cardinality}
                              defaultValue="1"
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...eventData];
                                  clubDataVal[index].cardinality = e;
                                  setEventData(clubDataVal);
                                }
                              }}
                              options={[
                                {
                                  value: 'leader',
                                  label: 'leader',
                                },
                                { value: 'member', label: 'member' },
                                {
                                  value: 'individual',
                                  label: 'individual',
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ height: '20px' }}></div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '40px' }}></div>
                          </td>
                          {/* <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Select a File
                            </span>
                          </td> */}
                          {/* <td>
                            <div style={{ width: '90px' }}></div>
                          </td> */}

                          {/* <td style={{ textAlign: 'left', width: '600px' }}>
                            <Dragger
                              fileList={fileVal}
                              maxCount={1}
                              multiple={false}
                              onChange={handleFile}
                              customRequest={dummyRequest}
                              //   onChange={handleFile}
                            >
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p
                                className="ant-upload-text"
                                style={{
                                  color: '#070C83',
                                  fontWeight: 600,
                                  fontSize: '10px',
                                }}
                              >
                                Click or drag file to this area to upload
                              </p>
                            </Dragger>
                          </td> */}
                        </tr>
                      </tbody>
                    </table>

                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ width: '50px' }}></div>
                            </td>
                            {profileDataValue &&
                              eventData &&
                              (profileDataValue.events[index]?.event_name !==
                                eventData[index].event_name ||
                                profileDataValue.events[index].level !==
                                  eventData[index].level ||
                                profileDataValue.events[index].cardinality !==
                                  eventData[index].cardinality ||
                                eventData[index].position !==
                                  profileDataValue.events[index].position) &&
                              !(
                                eventData[index].event_name == '' ||
                                eventData[index].level == ''
                              ) && (
                                <td style={{ textAlign: 'left' }}>
                                  <Button
                                    onClick={(e) => {
                                      updateStu(
                                        {
                                          type: 'EVENT',
                                          event_name: p.event_name,
                                          level: p.level,
                                          position: p.position,
                                          cardinality: p.cardinality,
                                          id: p.id,
                                        },
                                        dispatch
                                      );
                                    }}
                                    style={{
                                      background:
                                        'linear-gradient(to right, #000AF3, #69D0F0)', // Replace with your desired gradient colors
                                      border: 'none',
                                      color: 'white',
                                      width: '150px',
                                    }}
                                  >
                                    Update
                                  </Button>
                                </td>
                              )}
                            <td>
                              <div style={{ width: '20px' }}></div>
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  deleteStu(
                                    {
                                      type: 'EVENT',
                                      id: p.id,
                                    },
                                    dispatch
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </Card>
      ) : (
        <></>
      )}

      {sportData && sportData?.length ? (
        <Card
          bordered={false}
          className="header-solid mb-24"
          title={
            <>
              <h6 className="font-semibold">Sports</h6>
              {/* <p>Architects design houses</p> */}
            </>
          }
        >
          <Row gutter={[24, 24]}>
            {/* {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))} */}

            {sportData &&
              sportData.map((p, index) => (
                <Col span={24} md={24} xl={8} key={index}>
                  <Card bordered={false} className="card-project">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Name
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '90px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Input
                              value={p?.sport_name}
                              style={{ width: '300px' }}
                              onChange={(e) => {
                                let clubDataVal = [...sportData];
                                clubDataVal[index].sport_name = e.target.value;
                                setSportData(clubDataVal);
                              }}
                              // value={des}
                              //   style={{ height: '150px' }}
                              // onChange={(e) => setDesc(e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Level
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '100px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              style={{ width: '300px' }}
                              defaultValue="university"
                              value={p?.level}
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...sportData];
                                  clubDataVal[index].level = e;
                                  setSportData(clubDataVal);
                                }
                              }}
                              options={[
                                {
                                  value: 'university',
                                  label: 'university level',
                                },
                                { value: 'national', label: 'national level' },
                                {
                                  value: 'international',
                                  label: 'international level',
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              position
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '80px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              value={p?.position}
                              style={{ width: '300px' }}
                              defaultValue="1"
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...sportData];
                                  clubDataVal[index].position = e;
                                  setSportData(clubDataVal);
                                }
                              }}
                              options={[
                                {
                                  value: '1',
                                  label: '1',
                                },
                                { value: '2', label: '2' },
                                {
                                  value: '3',
                                  label: '3',
                                },
                                {
                                  value: 'part',
                                  label: 'part',
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '30px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Cardinality
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '80px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              style={{ width: '300px' }}
                              value={p?.cardinality}
                              defaultValue="1"
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...sportData];
                                  clubDataVal[index].cardinality = e;
                                  setSportData(clubDataVal);
                                }
                              }}
                              options={[
                                {
                                  value: 'leader',
                                  label: 'leader',
                                },
                                { value: 'member', label: 'member' },
                                {
                                  value: 'individual',
                                  label: 'individual',
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ height: '20px' }}></div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '40px' }}></div>
                          </td>
                          {/* <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Select a File
                            </span>
                          </td> */}
                          {/* <td>
                            <div style={{ width: '90px' }}></div>
                          </td> */}

                          {/* <td style={{ textAlign: 'left', width: '600px' }}>
                            <Dragger
                              fileList={fileVal}
                              maxCount={1}
                              multiple={false}
                              onChange={handleFile}
                              customRequest={dummyRequest}
                              //   onChange={handleFile}
                            >
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p
                                className="ant-upload-text"
                                style={{
                                  color: '#070C83',
                                  fontWeight: 600,
                                  fontSize: '10px',
                                }}
                              >
                                Click or drag file to this area to upload
                              </p>
                            </Dragger>
                          </td> */}
                        </tr>
                      </tbody>
                    </table>

                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ width: '50px' }}></div>
                            </td>
                            {profileDataValue &&
                              sportData &&
                              (profileDataValue.sports[index]?.sport_name !==
                                sportData[index].sport_name ||
                                profileDataValue.sports[index].level !==
                                  sportData[index].level ||
                                profileDataValue.sports[index].cardinality !==
                                  sportData[index].cardinality ||
                                sportData[index].position !==
                                  profileDataValue.sports[index].position) &&
                              !(
                                sportData[index].sport_name == '' ||
                                sportData[index].level == ''
                              ) && (
                                <td style={{ textAlign: 'left' }}>
                                  <Button
                                    onClick={(e) => {
                                      updateStu(
                                        {
                                          type: 'SPORT',
                                          event_name: p.sport_name,
                                          level: p.level,
                                          position: p.position,
                                          cardinality: p.cardinality,
                                          id: p.id,
                                        },
                                        dispatch
                                      );
                                    }}
                                    style={{
                                      background:
                                        'linear-gradient(to right, #000AF3, #69D0F0)', // Replace with your desired gradient colors
                                      border: 'none',
                                      color: 'white',
                                      width: '150px',
                                    }}
                                  >
                                    Update
                                  </Button>
                                </td>
                              )}
                            <td>
                              <div style={{ width: '20px' }}></div>
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  deleteStu(
                                    {
                                      type: 'SPORT',
                                      id: p.id,
                                    },
                                    dispatch
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </Card>
      ) : (
        <></>
      )}

      {selfLearningData && selfLearningData?.length ? (
        <Card
          bordered={false}
          className="header-solid mb-24"
          title={
            <>
              <h6 className="font-semibold">Self Learning</h6>
              {/* <p>Architects design houses</p> */}
            </>
          }
        >
          <Row gutter={[24, 24]}>
            {/* {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))} */}

            {selfLearningData &&
              selfLearningData.map((p, index) => (
                <Col span={24} md={24} xl={8} key={index}>
                  {console.log(p, 'test')}

                  <Card bordered={false} className="card-project">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Course Name
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '90px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Input
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...selfLearningData];
                                  clubDataVal[index].course_name =
                                    e.target.value;
                                  setSelfLearningData(clubDataVal);
                                }
                              }}
                              value={p?.course_name}
                              style={{ width: '300px' }}
                              // onChange={(e) => setName(e.target.value)}
                              // value={des}
                              //   style={{ height: '150px' }}
                              // onChange={(e) => setDesc(e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '50px' }}></div>
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Position
                            </span>
                          </td>
                          <td>
                            <div style={{ width: '80px' }}></div>
                          </td>

                          <td style={{ textAlign: 'left', width: '600px' }}>
                            <Select
                              style={{ width: '300px' }}
                              defaultValue="member"
                              onChange={(e) => {
                                {
                                  let clubDataVal = [...selfLearningData];
                                  clubDataVal[index].course_level = e;
                                  setSelfLearningData(clubDataVal);
                                }
                              }}
                              value={p?.course_level}
                              options={[
                                { value: 'beginner', label: 'beginner' },
                                {
                                  value: 'intermediate',
                                  label: 'intermediate',
                                },
                                { value: 'expert', label: 'expert' },
                              ]}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ height: '20px' }}></div>

                    <div style={{ height: '20px' }}></div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div style={{ width: '40px' }}></div>
                          </td>
                          {/* <td style={{ textAlign: 'left' }}>
                            <span
                              style={{
                                color: '#070C83',
                                fontWeight: 600,
                                fontSize: '15px',
                              }}
                            >
                              Select a File
                            </span>
                          </td> */}
                          {/* <td>
                            <div style={{ width: '90px' }}></div>
                          </td> */}

                          {/* <td style={{ textAlign: 'left', width: '600px' }}>
                            <Dragger
                              fileList={fileVal}
                              maxCount={1}
                              multiple={false}
                              onChange={handleFile}
                              customRequest={dummyRequest}
                              //   onChange={handleFile}
                            >
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p
                                className="ant-upload-text"
                                style={{
                                  color: '#070C83',
                                  fontWeight: 600,
                                  fontSize: '10px',
                                }}
                              >
                                Click or drag file to this area to upload
                              </p>
                            </Dragger>
                          </td> */}
                        </tr>
                      </tbody>
                    </table>

                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <div style={{ width: '50px' }}></div>
                            </td>
                            {profileDataValue &&
                              selfLearningData &&
                              (profileDataValue.selflearnings[index]
                                ?.course_name !==
                                selfLearningData[index].course_name ||
                                profileDataValue.selflearnings[index]
                                  .course_level !==
                                  selfLearningData[index].course_level) &&
                              !(
                                selfLearningData[index].course_name == '' ||
                                selfLearningData[index].course_level == ''
                              ) && (
                                <td style={{ textAlign: 'left' }}>
                                  <Button
                                    onClick={(e) => {
                                      updateStu(
                                        {
                                          type: 'SELF_LEARNINGS',
                                          course_level: p.course_level,
                                          course_name: p.course_name,
                                          id: p.id,
                                        },
                                        dispatch
                                      );
                                    }}
                                    style={{
                                      background:
                                        'linear-gradient(to right, #000AF3, #69D0F0)', // Replace with your desired gradient colors
                                      border: 'none',
                                      color: 'white',
                                      width: '150px',
                                    }}
                                  >
                                    Update
                                  </Button>
                                </td>
                              )}
                            <td>
                              <div style={{ width: '20px' }}></div>
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  deleteStu(
                                    {
                                      type: 'SELF_LEARNINGS',
                                      id: p.id,
                                    },
                                    dispatch
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </Card>
      ) : (
        <></>
      )}
      <Modal
        visible={updateProfilePicStatusModal}
        onOk={() => {
          if (fileVal.length) {
            let formData = new FormData();
            formData.append('file', fileVal[0]?.originFileObj);
            updateProfilePicDetails(formData, dispatch);
            setUpdateProfilePicStatus(false);
          } else {
            setErrorStaus(true);
          }
        }}
        onCancel={() => setUpdateProfilePicStatus(false)}
      >
        <Dragger
          fileList={fileVal}
          accept="image/png, image/jpeg"
          maxCount={1}
          multiple={false}
          onChange={handleFile}
          customRequest={dummyRequest}
          //   onChange={handleFile}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p
            className="ant-upload-text"
            style={{
              color: '#070C83',
              fontWeight: 600,
              fontSize: '10px',
            }}
          >
            Click or drag file to this area to upload
          </p>
        </Dragger>

        {picErrorStatus && (
          <span style={{ color: 'red', marginTop: '10px' }}>
            please select the image
          </span>
        )}
      </Modal>
      <Modal
        footer={null}
        onCancel={() => setUpdateInfoStatus(false)}
        visible={openUpdateProfileInfoStatus}
      >
        <UpdateProfile hideModal={hideModal} />
      </Modal>
    </>
  );
}

export default Profile;
