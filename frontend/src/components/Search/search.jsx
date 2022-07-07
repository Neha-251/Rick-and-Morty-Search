import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";
import {debounce} from "lodash";

import "./search.css";
import { BasicUserCard } from "../Basic User card/basicUserCard";


export const SearchMain = () => {

    const search = useLocation().search;
    const page = new URLSearchParams(search).get("page") || 1;

    const [data, setData] = useState([])
    console.log('data', data)
    const [resultCount, setResultCount] = useState(0);
    // console.log('resultCount', resultCount)
    const [totalPages, setTotalPages] = useState(0);
    // console.log('totalPages', totalPages)
    const [currPage, setCurrPage] = useState(1);
    // console.log('currPage', currPage)
    const [name, setName] = useState("");

    const getData = () => {
        axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
            .then(res => {
                // console.log(res.data)
                setData(res.data.results)
                setCurrPage(page);
                setTotalPages(res.data.info.pages);
                setResultCount(res.data.info.count)
            }).catch(err => console.error(err))
    }

    const getDataHandler = useCallback( debounce( getData, 1000), [])

    const memoDataHandler = useMemo(() => getDataHandler, [getDataHandler])

    useEffect(()=>{
        memoDataHandler();
    }, [name])


    return (
        <div className="searchMain_mainDiv">
            <div className="searchbar_mainDiv">
                <IoIosSearch className="searchIcon" />
                <input type="text" placeholder="Search for a contact" onChange={(e)=> setName(e.target.value)} />
            </div>
            <BasicUserCard data={data} />
        </div>
    )
}