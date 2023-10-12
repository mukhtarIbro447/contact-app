import { createSlice } from '@reduxjs/toolkit';
import { ContactState } from '../types/contacts';
import Service from 'api/service';

const initialState: ContactState = {
  isLoading: false,
};

const contactsSlice = createSlice({
  name: 'Contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Service.getContacts.pending, (state) => {
        state.data = undefined;
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(Service.getContacts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(Service.getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      });
  },
});

export default contactsSlice.reducer;
