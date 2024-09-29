/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DetailJobState {
    detailJob: any;
  }
  
  const initialState: DetailJobState = {
    detailJob: null,
  };

const detailJobSlice = createSlice({
  name: 'detailJob',
  initialState,
  reducers: {
    setDetailJob(state, action: PayloadAction<any>) {
      state.detailJob = action.payload;
    },
  },
});

export const { setDetailJob } = detailJobSlice.actions;
export default detailJobSlice.reducer;
