import React, { createContext, useContext, useState } from "react";


const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

const initialValue = {
    name: "",
    readTexts: []

}

export function UserProvider({ children }) {
    const [user, setUser] = useState(initialValue)

    function setUserName(name){
        setUser(prev => ({...prev, name}))

    }

    function addReadText(textId, index, correctAnswers, textLength){
        const newreadTexts = user.readTexts.filter(elem => elem.textId != textId)
        setUser(prev => ({...prev, readTexts: [...newreadTexts, {textId, index, correctAnswers, textLength}]}))
    }


    return (
        <UserContext.Provider value={{ user, setUserName, addReadText}}>
            {children}
        </UserContext.Provider>
    )
}