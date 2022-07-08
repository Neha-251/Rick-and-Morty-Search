import axios from "axios";
import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { IoIosSearch } from "react-icons/io";
import {debounce} from "lodash";
import {cardContext} from "../context/cardContext"
import "./search.css";
import { BasicUserCard } from "../Basic User card/basicUserCard";


export const SearchMain = () => {


    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [name, setName] = useState("");

    const {isVisible, currPage, setCurrPage, isFetching, setIsFetching} = useContext(cardContext)
 
    

    const getData = () => {

        axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&page=${currPage}`)
            .then(res => {
              
                let newData = res.data.results
                
                setData(newData)
                setTotalPages(res.data.info.count)
            }).catch(err => console.error(err))
    }

    const getDataAgain = () => {

        axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&page=${currPage}`)
            .then(res => {
              
                let newData = res.data.results
                let arr = data.concat(newData)
                setData(arr)
                setTotalPages(res.data.info.count)
            }).catch(err => console.error(err))
    }

    const getDataHandler = useCallback( debounce(()=> {
        getData()
    }, 1000), [name])

    const memoDataHandler = useMemo(() => getDataHandler, [name])



    useEffect(()=>{
        memoDataHandler();
        
    }, [name])

    useEffect(()=> {
        getDataAgain()
    }, [currPage])


    useEffect(()=> {
        if(totalPages > 0){
            setIsFetching(true);
        }
    }, [totalPages])
  

    return (
        <div className="searchMain_mainDiv">
            <div className="searchbar_mainDiv">
                <IoIosSearch className="searchIcon" />
                <input type="text" placeholder="Search for a contact" onChange={(e)=>{setName(e.target.value); setCurrPage(1) }} />
            </div>
            <BasicUserCard  data={data} />
        </div>
    )
}