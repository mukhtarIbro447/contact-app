import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { ContactData } from 'redux/types/contacts';

const getContacts = createAsyncThunk<ContactData[], void, { rejectValue: unknown }>(
  'getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ContactData[]>(`${process.env.REACT_APP_BASE_URL}api/v1/contacts`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const createContact = createAsyncThunk<ContactData, Partial<ContactData>, { rejectValue: unknown }>(
  'createContact',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<any>(`${process.env.REACT_APP_BASE_URL}api/v1/contacts`, { ...payload });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const updateContact = createAsyncThunk<any, Partial<ContactData>, { rejectValue: unknown }>(
  'updateContact',
  async (payload, { rejectWithValue }) => {
    const { id } = payload;
    try {
      const { data } = await axios.put<any>(`${process.env.REACT_APP_BASE_URL}api/v1/contacts/${id}`, { ...payload });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const deleteContact = createAsyncThunk<any, string, { rejectValue: unknown }>(
  'deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<any>(`${process.env.REACT_APP_BASE_URL}api/v1/contacts/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
