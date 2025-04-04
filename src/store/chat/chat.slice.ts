import { createSlice } from '@reduxjs/toolkit';
import { ChatTypes } from './chat.type';
import { getListConversations } from './chat.action';

const initialState: ChatTypes = {
    // messages: [],
    loading: false,
    conversations: null
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
    builder
    .addCase(getListConversations.pending, (state, action) => {
        state.loading = true;
        })
    .addCase(getListConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
        })
    .addCase(getListConversations.rejected, (state, action) => {
        state.loading = false;
        });
    },
});

export const selectIssues = (state: any) => state.chat;

export const { } = chatSlice.actions;

export default chatSlice.reducer;


