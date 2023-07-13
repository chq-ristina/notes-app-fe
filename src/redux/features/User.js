import { createSlice } from "@reduxjs/toolkit";

const user_id = localStorage.getItem('user_id') !== null ? JSON.parse(localStorage.getItem('user_id')) : "";
const username = localStorage.getItem('username') !== null ? JSON.parse(localStorage.getItem('username')) : "";
const logged_in = localStorage.getItem('logged_in') !== null ? JSON.parse(localStorage.getItem('logged_in')) : false; 

const setItemFunc = (user_id, username, logged_in) => {
    localStorage.setItem('user_id', JSON.stringify(user_id));
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('logged_in', JSON.stringify(logged_in));
}

export const userSlice = createSlice({
    name: "user",
    initialState: {value: {user_id: user_id, username: username, logged_in: logged_in}},
    reducers:{
        setUser: (state, action) => {
            state.value.user_id = action.payload.user_id;
            state.value.username = action.payload.username;
            state.value.logged_in = true;
            
            setItemFunc(state.value.user_id, state.value.username, state.value.logged_in);
        },
        removeUser: (state, action) =>{
            state.value.user_id = "";
            state.value.username = "";
            state.value.logged_in = false;

            setItemFunc(state.value.user_id, state.value.username, state.value.logged_in);
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;