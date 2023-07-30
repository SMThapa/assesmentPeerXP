import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({children}) =>{
    const [user, setUser] = useState('');
    const [usersList, setList] = useState([]);

    const states = {
        user,
        setUser,
        usersList,
        setList
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