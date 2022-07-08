import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { createContext, useState } from "react";



export const cardContext = createContext()

export const CardContextProvider = ({children}) => {

    const [clicked, setClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currPage, setCurrPage] = useState(1);


    const [isFetching, setIsFetching] = useState(false);
    console.log('currPage', currPage)
    

    const handleClicked = (data) => {
        setClicked(data)
    }

    const handleVisible = (data) => {
        setIsVisible(data);
    }




    return  <cardContext.Provider value={{
        clicked, handleClicked, isVisible, handleVisible, currPage, setCurrPage, isFetching, setIsFetching
      }} > {children}</cardContext.Provider>
}