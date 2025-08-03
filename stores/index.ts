import { configureStore } from "@reduxjs/toolkit";
import globalLoading from "@/stores/globalLoading";

const store = configureStore({
  reducer: {
    // 在这里存放状态
    globalLoading,
  },
});

// 用于类型推断和提示
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
