import {configureStore} from '@reduxjs/toolkit';
import userTokenReducer from './features/UserToken';
import userReducer from './features/User';

const store = configureStore({
    reducer: {
        userToken: userTokenReducer,
        user: userReducer
    },
    devTools: false
});

export default store;
