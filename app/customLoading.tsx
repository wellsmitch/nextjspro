"use client"
import React, { useEffect } from 'react';
import { Button, Spin } from 'antd';
import { usePathname, useSearchParams } from "next/navigation"
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";

import  { setGloablLoadingStatus } from "@/stores/globalLoading"
const App: React.FC = () => {

 const globalLoadingInfo = useSelector((state: RootState) => state.globalLoading);
 const pathname = usePathname()
 const searchParams = useSearchParams()
 const dispatch = useDispatch()
 useEffect(() => {
  dispatch(setGloablLoadingStatus({ show: false }));
 }, [pathname, searchParams])

 return (
  <>
   <Spin spinning={globalLoadingInfo.show} fullscreen />
  </>
 );
};

export default App;