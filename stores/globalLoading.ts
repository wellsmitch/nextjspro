import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalLoadingStatus } from "@/constants/globalLoading";

/**
 * 登录用户全局状态
 */
export const gloablLoadingSlice = createSlice({
  name: "loginUser",
  initialState: GlobalLoadingStatus,
  reducers: {
    setGloablLoadingStatus: (state, action: PayloadAction<CustomGlobalType.GlobalLoading>) => {
      return {
        ...action.payload,
      };
    },
  },
});

// 修改状态
export const { setGloablLoadingStatus } = gloablLoadingSlice.actions;

export default gloablLoadingSlice.reducer;
