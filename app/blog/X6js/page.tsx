"use client"
import Network from "@/network";
import { Graph, Shape } from '@antv/x6'
import { Select } from 'antd';
import { insertCss } from 'insert-css';
import React, { useEffect, useState } from "react"
import CHeader from "@/app/blog/CustomHeader"
import { useRouter } from "@bprogress/next"
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Option } = Select

const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            // visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            // visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            // visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            // visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
  ],
}


Graph.registerNode(
  'custom-rect',
  {
    inherit: 'rect',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: { ...ports },
  },
  true,
)

Graph.registerNode(
  'custom-polygon',
  {
    inherit: 'polygon',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: {
      ...ports,
      items: [
        {
          group: 'top',
        },
        {
          group: 'bottom',
        },
        {
          group: 'left',
        },
        {
          group: 'right',
        },
      ],
    },
  },
  true,
)

Graph.registerNode(
  'custom-circle',
  {
    inherit: 'circle',
    width: 45,
    height: 45,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: { ...ports },
  },
  true,
)

Graph.registerNode(
  'custom-image',
  {
    inherit: 'rect',
    width: 52,
    height: 52,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        stroke: '#5F95FF',
        fill: '#5F95FF',
      },
      image: {
        width: 26,
        height: 26,
        refX: 13,
        refY: 16,
      },
      label: {
        refX: 3,
        refY: 2,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 12,
        fill: '#fff',
      },
    },
    ports: { ...ports },
  },
  true,
)
const Index = () => {

  const [graph, setGraph] = useState<Graph>()

  const [x6ActiveInfo, setX6ActiveInfo] = useState<X6Info>({})
  const initFn = () => {
    Graph.registerEdge(
      'custom-edge-label',
      {
        inherit: 'edge',
        defaultLabel: {
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            label: {
              fill: '#000',
              fontSize: 14,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              pointerEvents: 'none',
            },
            body: {
              ref: 'label',
              fill: '#ffd591',
              stroke: '#ffa940',
              strokeWidth: 2,
              rx: 4,
              ry: 4,
              refWidth: '140%',
              refHeight: '140%',
              refX: '-20%',
              refY: '-20%',
            },
          },
          position: {
            distance: 200,
            options: {
              absoluteDistance: true,
              reverseDistance: true,
            },
          },
        },
      },
      true,
    )

    const graphIns = new Graph({
      container: document.getElementById('container')!,
      grid: 1,
      width: 1600,
      height: 500,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
      },
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20,
        },
        createEdge() {
          const edgeIns = new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                strokeDasharray: 5,
                style: {
                  animation: 'ant-line 30s infinite linear',
                },
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            tools: [
              { name: 'target-arrowhead' },
              { name: 'target-arrowhead' },
              {
                name: "button-remove",
                args: {
                  visiable: false,
                  distance: "50%",
                  offset: { y: -20 },
                },
              }
            ],
            zIndex: 0,
          })
          return edgeIns
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF',
            },
          },
        },
      },
    })
    setGraph(graphIns)

    insertCss(`
   .index-class g[data-tool-name="button-remove"] {
    display: none
   }
    @keyframes ant-line {
      to {
          stroke-dashoffset: -1000
      }
    }
  `)
  }

  const getX6ListFn = async () => {
    const res111: any = await Network.get("", {
      params: {
        tableName: "x6List"
      }
    });
    const { results = [] }: ResData = res111.data
    setX6List(results)
    if (results.length > 0) {
      setX6ActiveInfo(results[0])
    }
  }

  useEffect(() => {
    if (x6ActiveInfo.objectId) {
      graph?.fromJSON(JSON.parse(x6ActiveInfo.codeInfo || "{}"))
    }
  }, [x6ActiveInfo.objectId])

  useEffect(() => {
    initFn()
    getX6ListFn()
  }, [])


  const [x6List, setX6List] = useState<X6Info[]>([])
  const nextRouter = useRouter()
  return (
    <>
      <CHeader
        modelActiveCode="X6js"
        renderBack={() => {
          return <div
            onClick={() => {
              console.log('123', 123)
              nextRouter.replace("/blog")
            }}
            style={{ width: 100, textAlign: "right", cursor: "pointer" }}>
            <ArrowLeftOutlined className="header-back-icon" />返回
          </div>
        }}
      />
      <div>
        <Select style={{ width: 300 }} value={x6ActiveInfo.objectId} onChange={(v) => {
          setX6ActiveInfo(x6List.find(f => f.objectId === v)!)
        }}>
          {x6List.map((info) => {
            return <Option key={info.objectId}>{info.name}</Option>
          })}

        </Select>
        <div className='index-class' id='container'></div>
      </div>
    </>
  )

}

export default Index