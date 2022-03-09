import { createContext, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import createError from 'axios'
import { useEffect } from "react";
import useSWR from "swr";
import api from '../services/api'

const useFetch = (url) => {
    const { data, error } = useSWR(url, async url => {
        const response = await api.get("/user/me")
        return response
    })

    return { data, error }
}

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})

    const isAuthenticated = !!user;
    function signIn(data) {
        const err = api.post("/auth/login/", data).then(
            (response) => {

                setCookie(undefined, 'forense-auth-token', response.data.tokens.access, {
                    maxAge: 60 * 5 * 10, // 5 min
                })
                setCookie(undefined, 'forense-refresh-token', response.data.tokens.refresh, {
                    maxAge: 60 * 60 * 24, // 1 d
                })

                api.defaults.headers["Authorization"] = `Bearer ${response.data.tokens.access}`;

                api.get("/auth/me/").then((responseAuth) => {
                    setUser(responseAuth.data)
                })

                return response
            }
        ).catch((err) => {
            throw new Error(err.response.data.detail)
        })

        return err
    }

    function signOn(data) {
        const err = api.post("/auth/register/", data).then(
            (response) => {
                return response;
            }
        ).catch((err) => {
            console.log("Dentro do auth context: ", err.response.data)
            if (err.response.data.status_code == 400) {
                console.log("Mandando reponse.data")
                throw new Error(Object.values(err.response.data)[0])
            }
            console.log("Mandando reponse.data.detail")
            throw new Error(err.response.data.detail)
        })

        return err;
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOn }}>
        {children}
    </AuthContext.Provider>
}