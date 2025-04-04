import { Conversation } from '@/types/chat.types'
export type ChatTypes = {
    loading: boolean;
    conversations?: Conversation[] | null;
}