/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../config/store.config";
import { type ILoggedInUserProfile } from "../../context/auth.context";
import { useEffect, useState, useRef } from "react";
import chatService from "../../services/chat.service";
import socket from "../../config/socket.config";

export interface IChats {
    _id: string;
    sender: ILoggedInUserProfile; // Assuming sender is of type ILoggedInUserProfile
    receiver: ILoggedInUserProfile;
    message: string;
    images?: {
        publicId: string;
        secureUrl: string;
        optimizedUrl: string;
        _id: string;
    };
    createdAt: Date | string;
    updatedAt: Date | string;
}

const ChatList = () => {
    const [chats, setChats] = useState<IChats[]>([]); // State to hold the chat messages
    const divRef = useRef<HTMLDivElement | null>(null); // Reference to scroll to the latest message

    const selectedChat = useSelector((rootState: RootState) => {
        return rootState?.user?.selectedUser as unknown as ILoggedInUserProfile;
    });

    const getUserChatDetail = async () => {
        try {
            const response = await chatService.getMessage(selectedChat._id);
            setChats(response?.data.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedChat?._id) {
            getUserChatDetail();
        }
    }, [selectedChat]);

    useEffect(() => {
        const handleLoadChat = async () => {
            await getUserChatDetail();
        };
        socket.on("messageReceived", handleLoadChat);
        socket.on("updatedChat", handleLoadChat);
        return () => {
            socket.off("messageReceived", handleLoadChat);
            socket.off("updatedChat", handleLoadChat);
        };
    }, []);

    // Scroll to the latest message when chats update
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [chats]);

    return (
        <>
            {chats &&
                chats.map((chat: IChats) =>
                    chat.sender._id === selectedChat._id ? (
                        <div key={chat._id} className="flex justify-start w-full">
                            <div className="flex">
                                <div className="size-20">
                                    <Avatar
                                        src={
                                            chat.sender.image?.optimizedUrl ||
                                            "https://cdn-icons-png.flaticon.com/128/11764/11764930.png"
                                        }
                                        className="w-15! h-15!"
                                    />
                                </div>
                                <div className="p-4 flex-col">
                                    <p
                                        className="break-words bg-gradient-to-br from-red-600/90 to-purple-600 text-white p-3 rounded-t-4xl rounded-br-4xl"
                                        style={{ maxWidth: "fit-content" }}
                                    >
                                        {chat.message}
                                    </p>
                                    <p className="text-xs mt-3 text-left text-gray-500 dark:text-gray-400">
                                        {new Date(chat.createdAt).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={chat._id} className="flex justify-end">
                            <div className="p-4 flex-col" style={{ justifyItems: "end" }}>
                                <p
                                    className="break-words bg-gradient-to-br from-purple-600 to-blue-500 text-white p-3 rounded-t-4xl rounded-bl-4xl"
                                    style={{ maxWidth: "fit-content" }}
                                >
                                    {chat.message}
                                </p>
                                <p className="text-xs mt-3 text-end text-gray-500 dark:text-gray-400">
                                    {new Date(chat.createdAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    )
                )}
            <div ref={divRef} />
        </>
    );
};

export default ChatList;