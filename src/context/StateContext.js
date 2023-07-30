import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({children}) =>{
    const [user, setUser] = useState('');
    const [usersList, setList] = useState(JSON.parse(localStorage.getItem('userList')) || []);
    const [dummyList, setDummyList] = useState([])

    const states = {
        user,
        setUser,
        usersList,
        setList,
        dummyList,
        setDummyList
    }

    return(
        <StateContext.Provider value={states}>
            {children}
        </StateContext.Provider>
    )
}

export const useStates = () =>{
    return useContext(StateContext);
}