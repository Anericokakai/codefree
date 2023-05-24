import React from "react";
import { createContext } from "react";
import { Context } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { refreshtoken } from "../features/UsersSlice";

// ! inital state b4 loginin
const initialState={
    auth:false,
    admin:false,

}
const context=createContext(initialState)


// !create function to return the state
export const LoggedIn=({children})=>{
    return <context.Provider value={initialState}>{children}</context.Provider>
}



// ! reducer function to change our initial states
const reducer=(state,action)=>{
    switch (action.type) {
        case 'login':
            return {auth:true}
            
        case 'logout':
            return {auth:false}
    case 'admin':
        return {auth:true,
        admin:true}
        default:
            throw new Error()
            
    }

}


// ! create a use context function
export function Authentication(){
    return useContext(context)
}

// ! protected routes fuction for clients
export const checkIfUserIsLoggedIn=(token,refreshtoken)=>{
    if(token===''||refreshtoken===''){
        return window.location.href='/login'
    }

}

// ! protected route funcyion for the server
export const checkIfAdminIsLoggedIn=(token,refreshtoken,admin)=>{
console.log({
    toekn:token,
    refreshtoken:refreshtoken,
    admin:admin,
})
    if(token===''||refreshtoken===''||admin!==true){
 
        return window.location.href='/login'
    }
}