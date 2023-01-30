import React from 'react';
import styles from './ProfilePage.module.scss';
import {
  UserOutlined,
  IdcardOutlined,
  UserSwitchOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Input, Row, Col, Button, Space, Avatar, Image } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export const ProfilePage: React.FC = () => {
  return <div className={styles.profilePage}>ProfilePage Component
   <div className="App">
      
      {/* <div className="leftbox">
        <nav>
          <a className="user_profil">
            <UserOutlined />
            <p>Профиль пользователя</p>
          </a>
          <a onclick="tabs(1)" className="all_users">
            <IdcardOutlined />
          </a>
          <a onclick="tabs(2)" className="add_remove_user">
            <UserSwitchOutlined />
          </a>
          <a onclick="tabs(3)" className="data">
            <BarChartOutlined />
          </a>
        </nav>
      </div> */}

      <div className="rightbox">
        <div className="avatar">
          <Avatar
            size={64}
            style={{ backgroundColor: "#1677ff" }}
            icon={<UserOutlined />}
          />
        </div>

        <div className="full_name">
          <h3>Давид Антонио Обрегон</h3>
          <p>davidvilcao@gmail.com +79221110500 </p>
        </div>

        <div className="edit">
          <h3>Личные данные</h3>

          <p>Здесь вы можете редактировать и изменять вашу личную информацию</p>

          <p>
            <b>Изменить пароль</b>
          </p>
          <Space direction="vertical">
            <Input.Password
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Space>
          <p>
            <b>Изменить основную почту</b>
          </p>
          <Space direction="vertical">
            <Input placeholder="davidvilcao@gmail.com" />
          </Space>
          <Space wrap>
            <p>
              <b>Изменить номер телефона</b>
            </p>
            <Input.Group compact>
              <Input style={{ width: "10%" }} placeholder="7" />
              <Input style={{ width: "40%" }} placeholder="9221110500" />
            </Input.Group>

            <Button type="primary">Обновить данные</Button>
          </Space>
        </div>
      </div>
    </div>
    // </div>
  
  
  
  
  
};
