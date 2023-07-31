import { createSlice } from "@reduxjs/toolkit";

const username = localStorage.getItem('username') !== null ? JSON.parse(localStorage.getItem('username')) : "";
const logged_in = localStorage.getItem('logged_in') !== null ? JSON.parse(localStorage.getItem('logged_in')) : false; 
const user_id = localStorage.getItem('user_id') !== null ? JSON.parse(localStorage.getItem('user_id')) : "";

const setItemFunc = (username, logged_in, user_id) => {
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('logged_in', JSON.stringify(logged_in));
    localStorage.setItem('user_id', JSON.stringify(user_id));
}

export const userSlice = createSlice({
    name: "user",
    initialState: {value: { username: username, logged_in: logged_in, user_id: user_id}},
    reducers:{
        setUser: (state, action) => {
            state.value.username = action.payload.username;
            state.value.logged_in = true;
            state.value.user_id = action.payload.user_id
            
            setItemFunc(state.value.username, state.value.logged_in, state.value.user_id);
        },
        removeUser: (state, action) =>{
            state.value.username = "";
            state.value.logged_in = false;
            state.value.user_id = ""

            setItemFunc(state.value.username, state.value.logged_in, state.value.user_id);
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;