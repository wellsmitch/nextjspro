"use client"
import { useEffect } from "react";
import ThreeContainer from "./three/ThreeContainer";
import UIContainer from "./ui/UIContainer";
import BrowserUtil from "./utils/Browser";
import CHeader from "@/app/blog/CustomHeader"
import {useRouter} from "@bprogress/next"
import { ArrowLeftOutlined } from '@ant-design/icons';


export default function App() {
    const nextRouter = useRouter()
    useEffect(() => {
        BrowserUtil.init();
    }, []);

    return (
        <>
            <CHeader
                modelActiveCode="su7"
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
            <div style={{ width: "100vw", height: "100vh" }}>
                {/* 3D场景层 */}
                <ThreeContainer />
                {/* UI界面层 */}
                <UIContainer />
            </div>
        </>
    );
}
