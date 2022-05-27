import React, { useState, useEffect } from 'react';
import './Graphics.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { DatePicker, Space } from 'antd';
import { Typography } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { InputNumber } from 'antd';
const { RangePicker } = DatePicker;

const { Paragraph, Text, Link } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value) => {
  console.log('onOk: ', value);
};

const Graphics = () => {



  const { id } = useParams();

  const [graph, setGraph] = useState({
    labels: ['1', '2', '3'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 10],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  const [post_river, setPostRiver] = useState("")
  const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [value, setValue] = useState(null);
  const [input, setInput] = useState(null);


  const onOpenChange = (open) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }

  };

  const pushInterval = () => {
    axios.get(`http://localhost:8000/get_hydroposts_interval?post_id=${id}&year0=${dates[0].year()}&month0=${dates[0].month() + 1}&day0=${dates[0].date()}&year1=${dates[1].year()}&month1=${dates[1].month() + 1}&day1=${dates[1].date()}&step=${input}`)
      .then(res => {
        let labs = res.data[0]
        let dats = res.data[1]
        setGraph({
          labels: labs,
          datasets: [
            {
              label: 'Dataset 1',
              data: dats,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        });
      });
  }

  useEffect(() => {
    console.log(id)

    axios.get(`http://localhost:8000/get_hydroposts_calendar?post_id=${id}`)
      .then(res => {
        let labs = res.data[0]
        let dats = res.data[1]
        setGraph({
          labels: labs,
          datasets: [
            {
              label: 'Dataset 1',
              data: dats,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        });
      });

    axios.get(`http://localhost:8000/get_hydropost_by_id?post_id=${id}`)
      .then(res => {
        setPostRiver(res.data['river']);
      });

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Line options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      }} data={graph} />;
      <div className='post_control'>
        <h2>Пост: {id} - {post_river}</h2>
        <Paragraph>
          <Text strong>Укажите интервал наблюдений: </Text>
          <Space direction="vertical" size={12}>
            <RangePicker
              value={hackValue || value}
              onCalendarChange={(val) => setDates(val)}
              onChange={(val) => setValue(val)}
              onOpenChange={onOpenChange}
            />
          </Space>
        </Paragraph>
        <Paragraph>
          <Text strong>Укажите цену деления:</Text>
          <InputNumber min={1} defaultValue={7} onChange={(val) => { setInput(val) }} />
        </Paragraph>
        <Paragraph>
          <Button type="primary" onClick={() => pushInterval()} >Применить</Button>
        </Paragraph>
      </div>
    </div>
  );
};

export default Graphics;