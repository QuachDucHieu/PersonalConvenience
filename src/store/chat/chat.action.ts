import { ChatService } from '@/services/chat.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { errorMessage } from '~/common/message';

export const getListConversations = createAsyncThunk(
'chat/conversations',
    async () => {
        try {
            const response = await ChatService.getListConversations();
            return response;
        } catch (error: unknown) {
            // errorMessage(error.message);
            return;
        }
    }
);
