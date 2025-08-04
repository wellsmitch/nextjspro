"use client"
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

const DemoLine = () => {
  const data = [
    {
      date: '2019-01-01',
      value: 3,
    },
    {
      date: '2019-02-01',
      value: 4,
    },
    {
      date: '2019-03-01',
      value: 3.5,
    },
    {
      date: '2019-04-01',
      value: 5,
    },
    {
      date: '2019-05-01',
      value: 4.9,
      festival: '劳动节',
    },
    {
      date: '2019-06-01',
      value: 6,
    },
    {
      date: '2019-07-01',
      value: 7,
    },
    {
      date: '2019-08-01',
      value: 9,
    },
    {
      date: '2019-09-01',
      value: 3,
    },
    {
      date: '2019-10-01',
      value: 13,
      festival: '国庆节',
    },
    {
      date: '2019-11-01',
      value: 6,
    },
    {
      date: '2019-12-01',
      value: 23,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '带标注点的折线图',
    },
    description: {
      visible: true,
      text: '在折线图上标注重点的数据\uFF0C如节假日等',
    },
    forceFit: true,
    padding: 'auto',
    data,
    xField: 'date',
    yField: 'value',
    yAxis: { nice: true },
    label: { visible: false },
    markerPoints: [
      {
        visible: true,
        data: [
          {
            date: '2019-05-01',
            value: 4.9,
          },
          { date: '2019-10-01' },
        ],
        label: {
          visible: true,
          field: 'festival',
        },
      },
    ],
  };
  return <Line {...config} />;
};

export default DemoLine;