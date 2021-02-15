import React, { useReducer } from 'react'

export const AuthContext = React.createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            const token = action.payload;
            localStorage.setItem('token', token)
            return { state: token }
        case 'check':
            const user = localStorage.getItem('token');
            if (!user) {
                action.payload.history.push('/')
            }
            break;
        default:
            return state
    }
}

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, '')

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;