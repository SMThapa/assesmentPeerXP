import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({children}) =>{
    const [people, setPeople] = useState('');
    const [peopleList, setList] = useState([]);

    const states = {
        people,
        setPeople,
        peopleList,
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