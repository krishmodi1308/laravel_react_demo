import { createSlice } from '@reduxjs/toolkit'

const userFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userFromStorage,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('userInfo')
        },
    },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
