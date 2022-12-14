import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  city: 'Paris',
  sortType: 'Popular',
};

const appProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{city: string}>) => {
      state.city = action.payload.city;
    },
    changeSortType: (state, action: PayloadAction<{sortType: string}>) => {
      state.sortType = action.payload.sortType;
    },
  }
});

export default appProcess;

export const {changeCity, changeSortType} = appProcess.actions;

