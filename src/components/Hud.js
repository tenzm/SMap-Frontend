import React, { useRef, useEffect, useState } from 'react';
import './Hud.css';
import { DatePicker, Space } from 'antd';
import axios from 'axios';


import moment from 'moment';
import 'antd/dist/antd.css';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import type { DatePickerProps } from 'antd';

let gloabal_props;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    gloabal_props.callback(date.date(), date.month()+1, date.year());    
  };


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


const Hud = (props) => {
    gloabal_props = props;
    props.callback('16', '01', '2016');    
    return (
        <div>
            <div>
                <img className='logo' src={'https://mai.ru/press/brand/mai.gif'} style={{width: '70px', left: '20px',}}></img>
                <img className='logo' src={'http://localhost:3000/logo.png'} style={{left: '80px'}}></img>
            </div>
            <div className="calendar-bar">
                <Space direction="vertical" size={12}>
                    <DatePicker defaultValue={moment('2016/01/16', dateFormat)} onChange={onChange} format={dateFormat} />

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