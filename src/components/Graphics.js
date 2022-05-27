import React, { useState, useEffect } from 'react';
import './Graphics.css';
import 'antd/dist/antd.css';
import axios from 'axios';

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
import { faker } from '@faker-js/faker';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const Graphics = () => {

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

    useEffect(() => {
        axios.get(`http://localhost:8000/get_hydroposts_calendar?post_id=6023`)
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
        </div>
    );
};

export default Graphics;