import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import ChatReducer from '@/store/chat/chat.slice'; 
export const store = configureStore({
    reducer: {
      chat: ChatReducer,
    },
    // middleware: (getDefaultMiddleware: any) =>
    //   getDefaultMiddleware({
    //     serializableCheck: false,
    //   }),
  });
  
  export const STATUS_PENDING = 'pending';
  export const STATUS_FULFILLED = 'fulfilled';
  export const STATUS_REJECTED = 'rejected';
  
  export type STATUS_STORE_TYPE =
    | ''
    | typeof STATUS_PENDING
    | typeof STATUS_FULFILLED
    | typeof STATUS_REJECTED;
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export const useAppDispatch: () => AppDispatch = useDispatch;