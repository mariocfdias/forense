import React, { createContext, useState, useContext } from 'react'
import api from '../../services/api';

export const UserContext = createContext({})

export default function UserProvider({ children }) {

    const getAllUsers = async () => {
        const userRequest = await api.get(`/accounts/`);

        return {
            hasError: false,
            errorMessage: '',
            data: userRequest.data
        }
    }

    const createUser = async (userData) => {
        try {
            const userRequest = await api.post("/accounts/register/", userData);
            return {
                hasError: false,
                errorMessage: '',
                data: userRequest.data
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getUserById = async (uuid) => {
        try {
            const userRequest = await api.get(`/account/${uuid}/`);
            const userData = userRequest.data

            return {
                hasError: false,
                errorMessage: '',
                data: userData
            }
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const deleteUser = async (userId) => {
        try {
            const userRequest = await api.delete(`/account/${userId}`)
            const userData = userRequest.data

            return {
                hasError: false,
                errorMessage: '',
                data: userData
            }
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const updateUser = async (userId, userData) => {
        const userRequest = await api.patch(`/account/${userId}/`, userData)

        return {
            hasError: false,
            errorMessage: '',
            data: userRequest.data
        }

    }

    return (
        <UserContext.Provider value={{
            getAllUsers,
            updateUser,
            getUserById,
            createUser,
            deleteUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserProvider() {

    const context = useContext(UserContext);

    const {
        getAllUsers,
        updateUser,
        getUserById,
        createUser,
        deleteUser
    } = context;

    return {
        getAllUsers,
        updateUser,
        getUserById,
        createUser,
        deleteUser
    };
}