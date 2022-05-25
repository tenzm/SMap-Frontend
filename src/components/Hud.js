import React, { useRef, useEffect, useState } from 'react';
import './Hud.css';
import { DatePicker, Space } from 'antd';


import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

import { DatePickerProps } from 'antd';

import moment from 'moment';
import 'antd/dist/antd.css';


const menu = (
    <Menu
      items={[
        {
          label: 'Амур',
          key: '1',
        },
        {
          label: 'Селемджа',
          key: '2',
        }
      ]}
    />
  );


const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const Hud = () => {
    return (
        <div>
            <div>
                <img className='logo' src={'https://mai.ru/press/brand/mai.gif'} style={{width: '70px', left: '20px',}}></img>
                <img className='logo' src={'https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_Sberbank.svg'} style={{height: '30px', left:'100px', top: "35px"}}></img>
            </div>
            <div className="zoom">
                <span>
                    +
                </span>
                <span>
                    -
                </span>
            </div>
            <div className="calendar-bar">
                <Space direction="vertical" size={12}>
                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />

                </Space>
            </div>
            <div className="calendar-bar search" style = {{padding:'10px'}}>
            <Dropdown overlay={menu}>
                <a>
                <Space>
                    Выбор реки
                    <DownOutlined />
                </Space>
                </a>
            </Dropdown>
            </div>
        </div>
    );
};

export default Hud;