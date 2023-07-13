import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem('userToken') != null ? JSON.parse(localStorage.getItem('userToken')) : "";

const setItemFunc = (userToken) => {
    localStorage.setItem('userToken', JSON.stringify(userToken));
}

export const userTokenSlice = createSlice({
    name: "userToken",
    initialState: {value: {userToken: userToken}},
    reducers: {
        setUserToken: (state, action) => {
            state.value.userToken = action.payload;

            setItemFunc(state.value.userToken);
        },
        removeUserToken: (state, action) => {
            state.value.userToken = "";

            setItemFunc(state.value.userToken);
        }
    }
});

export const {setUserToken, removeUserToken} = userTokenSlice.actions;
export default userTokenSlice.reducer;