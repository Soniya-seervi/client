import React, {useReducer, useContext} from 'react'
import reducer from './reducer'
import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT, 
    SETUP_USER_BEGIN, 
    SETUP_USER_SUCCESS, 
    SETUP_USER_ERROR
    } 
    from './actions'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const useLocation = localStorage.getItem('location')


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user): null,
    token: token,
    userLocation: useLocation || '',
    jobLocation: useLocation || ''
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const[state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
        dispatch({type: CLEAR_ALERT})
        }, 3000);
    }

    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    // For register and login 
    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({ type: SETUP_USER_BEGIN})
        try {
            const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            // console.log(response);
            const {user, token, location} = response.data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: {user, token, location, alertText}
            })
            // adding to the local storage 
            addUserToLocalStorage({user, token, location})

        } catch (error) {
            // console.log(error.response);
            dispatch({
                type: SETUP_USER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert()
    }

    return <AppContext.Provider value={{...state, displayAlert, setupUser}}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}