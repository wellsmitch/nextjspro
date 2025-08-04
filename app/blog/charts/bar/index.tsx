"use client"
import React, { useState, useEffect } from 'react';
import { Bar, BarConfig } from '@ant-design/charts';
import { Rect } from '@antv/g';

const Index = () => {
  // console.log('G2&&&&&&&&&&&',G2)
  const data = [
    {
      date: '1',
      v: 3,
    },
    {
      date: '2',
      v: 4,
    },
    {
      date: 'c',
      v: 3,
    },
    {
      date: 's',
      v: 5,
    },
  ];
  const config: BarConfig = {
    title: {
      title: "标题",
      align: "center",
    },
    // description: {
    //   visible: true,
    //   text: '在折线图上标注重点的数据\uFF0C如节假日等',
    // },
    // forceFit: true,
    // padding: 'auto',
    // normalize: true,
    data,
    xField: 'date',
    yField: 'v',
    legend: {
      width: 100,
      title: {
        title: "aaa"
      },
      position: "left"
    },
    scrollbar: {
      y: {
        ratio: .5
      }, // y轴滚动条
    },
    "slider": {
      "y": {}
    },
    style: {
      // 自己的样式
      stroke: 'red',
      strokeWidth: 16,
      maxWidth: 6
    },
    scale:{
      x: {
        title: "x坐标轴",
      }
    },
    // colorField: 'date',
    // animate: false,
    axis: {
      x: {
        // title: "x坐标轴",
        line: true,
        lineLineWidth: 6,
      },
      y: {
        title: "y坐标轴",
        // nice: true,
        line: true,
        lineLineWidth: 6,
        lineArrowSize: 30,
        lineStroke: "#ff0",
        arrow: true,
        // lineExtension: [-100, -100],
        // tick: false,
        tickLength: 20,
        // negative在标签内部 positive在标签外部
        tickDirection: "positive",//'positive' | 'negative'
        tickLineWidth: 6,
        tickStroke: "#f0f",
        // tickFormatter: ()=> new Rect({
        //   style: {
        //     width: 2,
        //     height: 20,
        //     fill: '#1890FF',
        //     stroke: '#F04864',
        //     lineWidth: 4,
        //     // radius: [0, 4, 8, 16],
        //     cursor: 'pointer',
        //   }
        // })
      }

    },
    // label: { visible: false },
    // markerPoints: [
    //   {
    //     visible: true,
    //     data: [
    //       {
    //         date: '2019-05-01',
    //         value: 4.9,
    //       },
    //       { date: '2019-10-01' },
    //     ],
    //     label: {
    //       visible: true,
    //       field: 'festival',
    //     },
    //   },
    // ],
  };
  const config1 = {
    data: {
      type: 'fetch',
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/bar-bar.json',
    },
    xField: 'letter',
    yField: 'frequency',
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
  };
  return <Bar {...config} />
};

export default Index;