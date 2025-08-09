import ChatUserList from '../../components/chat/ChatUserList';
import ChatMessage from '../../components/chat/ChatMessage';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../config/store.config';
import { useEffect } from 'react';
import { getUserList } from '../../reducer/user.reducer';
import socket from '../../config/socket.config';

const ChatPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        socket.connect();
        dispatch(getUserList({
            page: 1,
            limit: 10,
            search: null,
        }))
    },[dispatch]);
     
    return (
        <div className="p-5 h-[90vh] flex bg-gray-100 gap-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {/* Chat List Section */}
            <ChatUserList/>
            {/* Chat Messages Section */}
            <ChatMessage/>
        </div>
    );
};

export default ChatPage;