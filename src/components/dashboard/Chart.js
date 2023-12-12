import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

import Title from './Title';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28FEF', '#EF82A2', '#82EF9F', '#EFDF82',
  '#F15BB5', '#FFAA33', '#66D8D3', '#B2967D',
  '#F28E2B', '#3F51B5', '#4CAF50', '#FF5722',
  '#795548', '#9C27B0', '#E91E63', '#673AB7',
  '#CDDC39', '#2196F3', '#FFEB3B', '#009688',
  '#FF9800', '#607D8B', '#F44336', '#8BC34A',
  '#00BCD4', '#FF4081', '#536DFE', '#1E88E5',
  '#00E676', '#FFD600', '#E64A19', '#FF6F61',
  '#4DB6AC', '#FFC107', '#FF5722', '#FF8A80',
  '#5E35B1', '#9C27B0', '#4A148C', '#FF5252',
  '#448AFF', '#536DFE', '#18FFFF', '#1DE9B6',
  '#69F0AE', '#FFAB40', '#FF3D00', '#FBC02D',
  '#00BFA5', '#558B2F', '#E64A19', '#FF6F61',
  '#E65100', '#FFD740', '#0288D1', '#C2185B',
  '#8E24AA', '#4527A0', '#2962FF', '#69F0AE',
  '#FFAB40', '#FF3D00', '#FBC02D', '#00BFA5',
  '#558B2F', '#E64A19', '#FF6F61', '#E65100',
  '#FFD740', '#0288D1', '#C2185B', '#8E24AA',
  '#4527A0', '#2962FF', '#FF5722', '#673AB7',
  '#CDDC39', '#2196F3', '#FFEB3B', '#009688',
  '#FF9800', '#607D8B', '#F44336', '#8BC34A',
  '#00BCD4', '#FF4081', '#536DFE', '#1E88E5',
  '#00E676', '#FFD600', '#E64A19', '#FF6F61',
  '#4DB6AC', '#FFC107', '#FF5722', '#FF8A80',
  '#5E35B1', '#9C27B0', '#4A148C', '#FF5252',
  '#448AFF', '#536DFE', '#18FFFF', '#1DE9B6',
  '#69F0AE', '#FFAB40', '#FF3D00', '#FBC02D',
  '#00BFA5', '#558B2F', '#E64A19', '#FF6F61',
  '#E65100', '#FFD740', '#0288D1', '#C2185B',
  '#8E24AA', '#4527A0', '#2962FF'
];

const Chart = (props) => {
  const { title, data } = props;

  const processData = (preprocessedData) => {
    const categoryCounts = {};
    if (preprocessedData && preprocessedData.length){
      preprocessedData.forEach(item => {
        let category = item.category_list
        if (category in categoryCounts) {
          categoryCounts[category]++;
        } else {
          categoryCounts[category] = 1;
        }
      });
    }
    const chartData = Object.keys(categoryCounts).map(key => {
      return { name: key, value: categoryCounts[key] };
    })
    return chartData
  }

    return (

      <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" height="100%">
        {
          data && data.length
          ? <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={processData(data)}
            // cx={200}
            // cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {
       processData(data).map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))

      }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        : <div>No Data</div>
        }

      </ResponsiveContainer>
      </React.Fragment>
    );

};

export default Chart
