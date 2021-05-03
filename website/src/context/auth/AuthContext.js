import React, { useReducer } from 'react'
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext();

const authReducer = (state, action) => {

    let user = localStorage.getItem('token');

    switch (action.type) {
        case "login":
            const token = action.payload;
            localStorage.setItem('token', token)
            return { state: token }
        case 'check':
            if (user) {
                const { exp } = jwt_decode(user)
                const expirationTime = (exp * 1000) - 60000;

                if (Date.now() >= expirationTime) {
                    localStorage.removeItem('token');
                    action.payload.history.push('/login')
                }
            }

            if (!user) {
                action.payload.history.push('/login')
            }
            break;
        case 'check_login_page':
            if (user) {
                action.payload.history.push('/dashboard')
            }
            break;
        case 'sign_out':
            localStorage.removeItem('token');
            action.payload.history.push('/login');
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