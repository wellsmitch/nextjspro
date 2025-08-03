"use client"
import { useCallback, useEffect } from "react";
import { setGloablLoadingStatus } from "@/stores/globalLoading";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
export const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  // 初始化全局用户状态
  const doInitGlobalLoading = useCallback(async () => {
    dispatch(setGloablLoadingStatus({ show: false }));
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitGlobalLoading();
  }, []);
  return children;
};