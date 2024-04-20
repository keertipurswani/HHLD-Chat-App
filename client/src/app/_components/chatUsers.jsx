import React, { useEffect } from 'react'
import { useUsersStore } from '../zustand/useUsersStore'
import { useChatReceiverStore } from '../zustand/useChatReceiverStore';
import { useChatMsgsStore } from '../zustand/useChatMsgsStore'
import axios from 'axios'

const ChatUsers = () => {
    const {users} = useUsersStore();
    const { chatReceiver, updateChatReceiver} = useChatReceiverStore();
    const { updateChatMsgs} = useChatMsgsStore();

    const setChatReceiver = (user) => {
        updateChatReceiver(user.username);
      }    
      
      useEffect(() => {
        const getMsgs = async () => {
            const res = await axios.get('http://localhost:8080/msgs',
                {
                    params: {
                        'sender': authName,
                        'receiver': chatReceiver
                    }
                },
                {
                    withCredentials: true
                });
            if (res.data.length !== 0) {
                updateChatMsgs(res.data);
            } else {
                updateChatMsgs([]);
            }
        }
        if(chatReceiver) {
            getMsgs();
       }
    }, []) 

    return (
        <div>
            {users.map((user, index) => (
                <div onClick={() => setChatReceiver(user)}
                    className='bg-blue-300 rounded-xl m-3 p-5'>
                    { user.username }
                </div>
            ))}
        </div>
    )
}

export default ChatUsers