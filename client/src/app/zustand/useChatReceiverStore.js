import {create} from 'zustand';

export const useChatReceiverStore = create( (set) => ({
   chatReceiver: '',
   updateChatReceiver: (chatReceiver) => set({ chatReceiver: chatReceiver }),
}));
