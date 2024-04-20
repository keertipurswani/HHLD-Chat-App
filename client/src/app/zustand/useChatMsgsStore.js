import {create} from 'zustand';

export const useChatMsgsStore = create( (set) => ({
   chatMsgs: [],
   updateChatMsgs: (chatMsgs) => set({chatMsgs})
}));
