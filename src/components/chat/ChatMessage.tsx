import { Avatar } from "antd";
import { useEffect, useRef, useState, type BaseSyntheticEvent } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../config/store.config";
import { useAuth, type ILoggedInUserProfile } from "../../context/auth.context";
import ChatList from "./ChatList";
import chatService from "../../services/chat.service";
import socket from "../../config/socket.config";

const ChatMessage = () => {
    const divRef = useRef<HTMLDivElement | null>(null); // Reference to the div element
    // Scroll to the bottom of the chat messages when the component mounts

    const {loggedInUser} = useAuth(); // Get the logged-in user from the context

    const [chats, setChats] = useState<string>(''); // State to hold the chat messages
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({
                behavior: 'instant'
            });
        }
    }, []);

    const selectedChat = useSelector((rootState: RootState) => {
        return rootState?.user?.selectedUser as unknown as ILoggedInUserProfile
    })
    // const loggedInUser = useSelector((rootState: RootState) => {
    //     return rootState?.auth?.loggedInUser as unknown as ILoggedInUserProfile;
    // });
    const state = useSelector((rootState: RootState) => rootState);
    console.log(state);

    const handleSubmitChat = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const chatBody = { receiver: selectedChat._id, message: chats };
        try {
            if (chats.trim() !== '') { // Check if the input is not empty
                // Call the chat service to send the message
                await chatService.sendMessage(chatBody);
                setChats([...chats, chatBody.message].join('')); // Update the chat state with the new message
                setChats(''); // Clear the input field after sending the message
                socket.emit("messageSent", { receiver: selectedChat._id, sender: loggedInUser?._id }); // Emit the message to the server
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    useEffect(() => {
    }, [selectedChat]);
    return (
        <>
            <div className="lg:w-full flex-1 h-full flex flex-col bg-white rounded-lg p-4 overflow-y-auto">
                {
                    selectedChat ?
                        <>
                            {/* Chat Header */}
                            <div className="flex gap-3 mb-5 mt-5 items-center border-b border-gray-200 pb-3">
                                <Avatar
                                    src={selectedChat?.image?.optimizedUrl || "https://cdn-icons-png.flaticon.com/128/15219/15219445.png"}
                                    className="w-15! h-15!"
                                />
                                <h2 className="text-xl font-semibold">
                                    {selectedChat?.firstName + " " + selectedChat?.lastName || "Unknown User"}
                                </h2>
                            </div>
                            { /* Chat Messages */}
                            <div className="flex-1 flex flex-col p-4 overflow-y-auto w-full">
                                <ChatList />
                                <div ref={divRef} />
                            </div>
                            {/* Chat Input */}
                            <div className="flex gap-3 p-4 items-center border-gray-200">
                                 <button
                                    type="button"
                                    onClick={() => {

                                        alert("Image upload functionality is not implemented yet.");
                                    }
                                }
                                >
                                    <img src="https://cdn-icons-png.flaticon.com/128/8191/8191581.png" className="w-11 h-11 cursor-pointer hover:scale-110" alt="Send"/>
                                </button>
                                <input
                                    type="text"
                                    id="default-input"
                                    value={chats}
                                    onChange={(e) => setChats(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-indigo-700 block w-full p-3 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Type your message..."
                                    autoComplete="off"
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // Prevent default behavior of Enter key
                                            handleSubmitChat(e); // Call the function to handle chat submission
                                            setChats(''); // Clear the input field after sending the message

                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleSubmitChat}
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm p-3 text-center cursor-pointer"
                                >
                                    Send
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <div className="flex items-center justify-center h-full">
                                <div className="text-gray-500 text-lg">
                                    Select a user to start chatting
                                </div>
                            </div>
                        </>
                }
            </div>
        </>

    )
}
export default ChatMessage;