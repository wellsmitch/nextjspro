"use client"
import { useParams } from "next/navigation";
import './index.scss';
import { Alert, Button, Card, Col, Flex, Form, notification, Row, Space, Tabs } from 'antd';
import { act, useEffect, useRef, useState } from 'react';
import Network from "@/network"
import { ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons';
import 'highlight.js/styles/github-dark.min.css';
import CHeader from "@/app/blog/CustomHeader"
import {useRouter} from "@bprogress/next"

const ActicleManager: React.FC = () => {
 const nextRouter = useRouter()
  const { typeCode } = useParams<{ typeCode: string }>() || { typeCode: "" }

  const [indexRes, setIndexRes] = useState<ResData>({
    count: 0,
    results: [],
  })

  const [dataParams, setDataParams] = useState({
    current: 1,
    pageSize: 5,
  })

  const [tabsAccessKey, settabsAccessKey] = useState(typeCode || "")

  const getList = async (searchActionFlag?: any) => {
    const urlSearchCode = tabsAccessKey
    const cres = await Network.get("", {
      params: {
        tableName: "indexData",
        count: 1,
        skip: (dataParams.current - 1) * (dataParams.pageSize),
        limit: dataParams.pageSize,
        where: JSON.stringify({
          "$and": [
            urlSearchCode ? {
              "moduleType": {
                "$regex": urlSearchCode, "$options": "i"
              },
            } : null
          ],
          // "$or": [
          //   (kval ? {
          //     "moduleType": {
          //       "$regex": kval, "$options": "i"
          //     },
          //   } : {}),
          //   (kval ? {
          //     "content": {
          //       "$regex": kval, "$options": "i"
          //     },
          //   } : {})
          // ]
        })
      },
    });
    const res: ResData = cres.data||{}
    const splitMark = "$_$_$"
    res?.results?.map((info: ResInfo) => {
      let tempList = (info.content || "") && (info?.content?.replace(/<pre/ig, splitMark + "<pre").replace(/<\/pre>/ig, "</pre>" + splitMark).split(splitMark));
      tempList = (info.content || "") && (info?.content?.replace(/<code/ig, splitMark + "<code").replace(/<\/code>/ig, "</code>" + splitMark).split(splitMark));
      tempList = (info.content || "") && (info?.content?.replace(/<div class=\"ql-code-block-container\"/ig, splitMark + "<div class=\"ql-code-block-container\"").split(splitMark));
      let resTempList = tempList && tempList.map(str => {
        let tempStrInfo = {
          type: (str.indexOf("<pre") > -1 || str.indexOf("<code") > -1 || str.indexOf("<div class=\"ql-code-block-container\"") > -1) ? "code" : "string",
          val: str
        };
        return tempStrInfo
      }).filter(f => f.val) || []
      info.contentList = resTempList
    })
    const resResults = {
      ...indexRes,
      count: res.count,
      results: searchActionFlag ? res.results : [...(indexRes.results || []), ...(res.results || [])]
    }
    setIndexRes(resResults)
  }

  useEffect(() => {
    getList(false)
  }, [dataParams, typeCode,  tabsAccessKey])


  const domRefs = useRef<any[]>([])

  const transformModuleTypeFn = (_moduleType: any) => {
    const findCodeInfo = categoryList.find(f => f.code === _moduleType)
    return findCodeInfo && findCodeInfo.name || ""
  }
  useEffect(() => {
    // console.log('cardRefs',domRefs)
    const ddref = indexRes?.results?.map(f => {
      f.isInitFlag = true;
      return f
    }).forEach((f, fIndex) => {
      new IntersectionObserver((entries: any[]) => {
        entries.forEach((entry: any) => {
          if (false) {
            f.isInitFlag = false
          } else {
            if (entry.intersectionRatio > 0) {
              // 元素进视口
              if (entry.rootBounds && entry.boundingClientRect && (entry.boundingClientRect.bottom - entry.rootBounds.bottom > 0)) {
                // 底部进入
                console.log('111111', 111111, fIndex)
                f.domShowByBottom = true
                f.domHideByBottom = true
                f.domHideByTop = false
                f.domShowByTop = false;
                // console.log("isFromTop",entry.isIntersecting);

                if (indexRes.results) {
                  indexRes.results[fIndex] = {
                    ...indexRes.results[fIndex],
                    domShowByBottom: true,
                    domHideByBottom: true,
                    domHideByTop: false,
                    domShowByTop: false,
                  }
                }

                setIndexRes({ ...indexRes })
                // console.log(1);
              } else if (entry.rootBounds && entry.boundingClientRect && (entry.boundingClientRect.top - entry.rootBounds.top < 0)) {

                // f.domShowByBottom = false
                // f.domHideByBottom = false
                // f.domHideByTop = false
                // f.domShowByTop = true
                // 顶部进入
                // console.log(2);

              }
            } else {
              // 元素出视口

              if (entry.rootBounds && entry.boundingClientRect && (entry.boundingClientRect.bottom - entry.rootBounds.bottom > 0)) {
                // 底部消失
                // console.log(3);
                // isFromTop = true;
                f.domShowByBottom = false
                f.domHideByBottom = true
                f.domHideByTop = false
                f.domShowByTop = false
                // console.log("2222222",entry.isIntersecting);
                if (indexRes.results) {
                  indexRes.results[fIndex] = {
                    ...indexRes.results[fIndex],
                    domShowByBottom: false,
                    domHideByBottom: true,
                    domHideByTop: false,
                    domShowByTop: false,
                  }
                }

                setIndexRes({ ...indexRes })
              } else if (entry.rootBounds && entry.boundingClientRect && (entry.boundingClientRect.top - entry.rootBounds.top < 0)) {
                // 顶部消失
                // f.domShowByBottom = false
                // f.domHideByBottom = true
                // f.domHideByTop = false
                // f.domShowByTop = false
                // console.log(4);

              }
            }
          }
        })

      }, {}).observe(domRefs.current[fIndex]);

      return f
    })
  }, [indexRes.results])

  const [categoryList, setcategoryList] = useState<any[]>([])

  const getCategoryList = async () => {

    const cresData = await Network.get("", {
      params: {
        tableName: "codeList",
        // count: 1,
        // skip: (dataParams.current - 1) * (dataParams.pageSize),
        // limit: dataParams.pageSize,
        where: {

          //  "$or": [
          //   (kval ? {
          //    "code": {
          //     "$regex": kval, "$options": "i"
          //    },
          //   } : {}),
          //  ]
        }
      }
    })
    const resData = cresData.data ||{}
    setcategoryList((
      resData?.results?.map((f: ResInfo) => {
        return { ...f, code: `${f.code}` }
      }) || []
    ))
  }

  useEffect(() => {

    if (typeCode) {
      getCategoryList()
    }
  }, [])

  const searchCode = typeCode

  return (
    <>
      <CHeader 
      modelActiveCode="categoryListIndex"
      renderBack={()=> {
        return <div
        onClick={()=> {
          console.log('123',123)
          nextRouter.replace("/blog")
        }}
        style={{width: 100, textAlign: "right", cursor: "pointer"}}>
          <ArrowLeftOutlined className="header-back-icon" />返回
        </div>
      }}
      />
      <Row style={{ paddingTop: 16 }}>
        {searchCode && <Col span={3} offset={1}>
          <Tabs
            activeKey={tabsAccessKey}
            style={{ height: "90vh", position: "sticky", top: "0px" }}
            tabPosition={"left"}
            onChange={(activeKey) => {
              settabsAccessKey(activeKey)
              setIndexRes({
                count: 0,
                results: [],
              })
            }}
            items={categoryList.map((info) => {
              return {
                label: `${info.name}`,
                key: `${info.code}`
              };
            })}
          />
        </Col>}

        <Col span={searchCode ? 19 : 23} >
          <Space.Compact block className='indexHome' direction="vertical">
            {
              indexRes?.results?.map((info, index) => {
                return (
                  <Card ref={ref => {
                    domRefs.current[index] = ref
                  }} className={"index-card list-panel-hide-bottom " + ((info.domShowByBottom || index == 0) ? 'list-panel-show-bottom' : '')}
                    key={"a" + index}
                    title={<>
                      <span className='index-card-title-category'>{transformModuleTypeFn(info.moduleType)}</span>   <span>{info.title}</span>
                    </>}>
                    {
                      info.contentList.map((contentInfo: any, contentIndex: number) => {
                        if (contentInfo.type === 'string') {
                          return <div key={"d-" + index + contentIndex} dangerouslySetInnerHTML={{ __html: contentInfo.val }} />

                        } else {
                          return <div key={"c" + index + contentIndex} className='code-wrap-panel'>
                            <CopyOutlined onClick={() => {
                              const tempdiv = document.createElement("div")
                              tempdiv.innerHTML = contentInfo.val
                              // tempdiv.style.display = "none"
                              document.body.append(tempdiv)

                              const temD = tempdiv.querySelector(".ql-ui")
                              temD && temD.remove()


                              const tempDom = document.createElement("textarea")
                              // tempDom.style.display = "none"
                              tempDom.innerText = tempdiv.innerText
                              document.body.append(tempDom)
                              tempDom.select()
                              const copyRes = document.execCommand("copy")

                              notification.success({
                                message: "复制成功！" + copyRes
                              })

                              tempDom.remove()
                              tempdiv.remove()
                            }} className='code-wrap-copy-icon' />
                            <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: contentInfo.val }} />
                          </div>
                        }
                      })
                    }
                  </Card>
                )
              })
            }

          </Space.Compact>

          {(indexRes?.results?.length || 0) < (indexRes?.count || 0) && ((indexRes?.count || 0) > 0) && <Flex vertical gap="small" style={{ width: '100%' }}>
            <Button block onClick={() => {
              setDataParams({
                ...dataParams,
                current: dataParams.current + 1
              })
            }}>加载更多</Button>
          </Flex>}
          {indexRes.count == 0 && <Flex vertical gap="small" style={{ width: '100%' }}>
            <Alert style={{ lineHeight: "32px" }} showIcon type='info' message={"博主正在学习整理中敬请期待吧~"}></Alert>
          </Flex>}
        </Col>
      </Row>
    </>
  );
};

export default ActicleManager;
