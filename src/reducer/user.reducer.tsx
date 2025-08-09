import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import type { IPaginationSearch } from "../config/constant";

//async action to fetch user list
export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (params: IPaginationSearch) => {
    // Convert IPaginationSearch to a plain object if necessary
    return await userService.getRequest('user', {
      params: { ...params } // Spread operator to ensure params is an object
    });
  }
);

const UserSlicer = createSlice({ 
    name: 'user',
    initialState: {
        userList: null,
        userPagination: null,
        selectedUser: null, // This can be used to store the currently selected user in the chat
        chat: null, // This can be used to store the chat messages with the selected user
        isLoadingChats: false // This can be used to indicate if chats are being loaded
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setChat: (state, action) => {
            state.chat = action.payload;
        },
        setIsLoadingChats: (state, action) => {
            state.isLoadingChats = action.payload;
        }

    },
    extraReducers: (builder) => { 
        builder
        .addCase(getUserList.fulfilled, (state , action) => {
            console.log(action);
            state.userList = action.payload.data;
            state.userPagination = action.payload.options.pagination;
        })
        .addCase(getUserList.rejected, (state) => {
            state.userList = null;
            state.userPagination = null;
        })

    }
});
export const { setSelectedUser , setChat, setIsLoadingChats} = UserSlicer.actions;

export default UserSlicer.reducer;
// This reducer handles user-related state changes