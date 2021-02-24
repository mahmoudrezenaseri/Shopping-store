import React, { useReducer } from 'react'

export const AuthContext = React.createContext();

const authReducer = (state, action) => {

    let user = localStorage.getItem('token');

    switch (action.type) {
        case "login":
            const token = action.payload;
            localStorage.setItem('token', token)
            return { state: token }
        case 'check':
            if (!user) {
                action.payload.history.push('/')
            }
            break;
        case 'check_login_page':
            if (user) {
                action.payload.history.push('/dashboard')
            }
            break;
        case 'sign_out':
            localStorage.removeItem('token');
            action.payload.history.push('/');
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