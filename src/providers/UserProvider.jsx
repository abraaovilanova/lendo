import React, { createContext, useContext, useState } from "react";


const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

const initialValue = {
    name: "",
    readTexts: []

}

export function UserProvider({ children }) {
    const [user, setUser] = useState(initialValue)

    function getLocalStorageUser() {
        const localStorageUser = JSON.parse(localStorage.getItem('lendo'))
        if (localStorageUser) {
            setUser(localStorageUser)
            return true
        }

        return false

    }

    function setUserLocalStorage(name) {
        localStorage.setItem('lendo', JSON.stringify({ name: name, readTexts: [] }))
    }

    function setUserName(name) {
        setUser(prev => ({ ...prev, name }))

    }

    function addReadText(textId, index, correctAnswers, textLength) {
        const newreadTexts = user.readTexts.filter(elem => elem.textId !== textId)
        setUser(prev => ({ ...prev, readTexts: [...newreadTexts, { textId, index, correctAnswers, textLength }] }))
        const localStorageUser = JSON.parse(localStorage.getItem('lendo'))
        localStorage.setItem('lendo', JSON.stringify({...localStorageUser, readTexts: [...newreadTexts, { textId, index, correctAnswers, textLength }]}))
    }


    return (
        <UserContext.Provider value={{ user, setUserName, addReadText, setUserLocalStorage, getLocalStorageUser }}>
            {children}
        </UserContext.Provider>
    )
}