import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    count: 0,
  },
  reducers: {
    setNotificationCount: (state, action) => {
      state.count = action.payload;
    },
    incrementNotificationCount: (state) => {
      state.count += 1;
    },
    decrementNotificationCount: (state) => {
      state.count = Math.max(state.count - 1, 0);
    },
  },
});

export const {
  setNotificationCount,
  incrementNotificationCount,
  decrementNotificationCount,
} = notificationSlice.actions;

export default notificationSlice.reducer;
