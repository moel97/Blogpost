import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
axios.defaults.withCredentials = true;
export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState( JSON.parse(localStorage.getItem("user")) || null );

    const login = async (userData) => {
        const res = await axios.post("http://localhost:3000/api/auth/login",userData);
        setCurrentUser(res.data);
        return res
    };

    const logout = async () => {
        console.log("lolg");
        await axios.post("http://localhost:3000/api/auth/logout");
        setCurrentUser(null);
    };

    useEffect( () => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

    return (<AuthContext.Provider value={{currentUser,setCurrentUser,login,logout}}>
        {children}
        </AuthContext.Provider>);
};