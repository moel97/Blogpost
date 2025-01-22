import API from "../axios_common";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
API.defaults.withCredentials = true;
export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState( JSON.parse(localStorage.getItem("user")) || null );

    const login = async (userData) => {
        const res = await API.post("/auth/login",userData);
        setCurrentUser(res.data);
        return res
    };

    const logout = async () => {
        console.log("lolg");
        await API.post("/auth/logout");
        setCurrentUser(null);
    };

    useEffect( () => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

    return (<AuthContext.Provider value={{currentUser,setCurrentUser,login,logout}}>
        {children}
        </AuthContext.Provider>);
};