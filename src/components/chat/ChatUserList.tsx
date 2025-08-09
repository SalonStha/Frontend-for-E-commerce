import { Avatar, List } from "antd";
import type { ILoggedInUserProfile } from "../../context/auth.context";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../config/store.config";
import { setSelectedUser } from "../../reducer/user.reducer";
import { useEffect, useState } from "react";

const ChatUserList = () => {
    const [search, setSearch] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<ILoggedInUserProfile[]>([]);

    const userList = useSelector((rootState: RootState) => {
        return rootState?.user?.userList || [];
    }) as ILoggedInUserProfile[];

    const dispatch = useDispatch();
    const selectedChat = (activeUser: ILoggedInUserProfile) => {
        dispatch(setSelectedUser(activeUser));
    };

    useEffect(() => {
        // Optionally fetch userList here
        // dispatch(fetchUserList());
    }, [dispatch]);

    useEffect(() => {
        if (!userList) {
            setFilteredUsers([]);
            return;
        }
        if (!search.trim()) {
            setFilteredUsers(userList);
        } else {
            const filtered = userList.filter((user) =>
            (`${user.firstName || ""} ${user.lastName || ""}`
                .toLowerCase()
                .includes(search.toLowerCase()) ||
                (user.email || "").toLowerCase().includes(search.toLowerCase()))
            );
            setFilteredUsers(filtered);
        }
    }, [search, userList]);

    return (
        <div className="w-full lg:w-1/4 bg-white rounded-lg p-4 overflow-y-auto">
            <div className="flex flex-col justify-between mb-5 mt-5 gap-5">
                <h2 className="text-2xl font-semibold">Chats</h2>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm rounded-xl bg-gray-50 border border-gray-300 focus:outline"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }} 
                        placeholder="Search users..." 
                        autoComplete="off"
                        required />
                </div>
            </div>
            {filteredUsers && filteredUsers.length > 0 ? (
                <List
                    dataSource={filteredUsers}
                    renderItem={(user: ILoggedInUserProfile) => (
                        <List.Item
                            key={user._id}
                            className="flex gap-x-6 cursor-pointer hover:bg-gray-300/20 hover:rounded-md hover:shadow-xl p-4!"
                            onClick={() => selectedChat(user)}
                            style={{
                                borderRadius: "8px",
                                transition: "background-color 0.3s ease",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    user.image && user.image.optimizedUrl ? (
                                        <Avatar
                                            src={user.image.optimizedUrl}
                                            className="size-15!"
                                        />
                                    ) : (
                                        <Avatar
                                            src="https://cdn-icons-png.flaticon.com/128/15219/15219445.png"
                                            className="size-15!"
                                        />
                                    )
                                }
                                title={
                                    <p className="text-[15px] font-semibold">
                                        {user.firstName + " " + user.lastName}
                                    </p>
                                }
                                description={
                                    <p className="text-[13px] text-gray-500">
                                        {user.email}
                                    </p>
                                }
                                children={
                                    <p className="text-[13px] text-gray-500">
                                        Last message...
                                    </p>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <p className="text-gray-500 text-center">
                    {userList.length > 0 ? "No users found" : "Loading users..."}
                </p>
            )}
        </div>
    );
};

export default ChatUserList;