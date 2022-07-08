import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { cardContext } from "../context/cardContext";
import { Modal } from "../Details User Card/detailsUserCard";
import { debounce } from "lodash";
import "./basicUserCard.css";


export const BasicUserCard = (props) => {

    const { clicked, handleClicked, isVisible, handleVisible, isFetching, setCurrPage } = useContext(cardContext);

    const cardRef = useRef()
    const singleCardRef = useRef()
    const [item, setItem] = useState({})
    const [intersecting, setIntersecting] = useState(false);

    // const { handleClicked } = useContext(cardContext);

    const handleClose = () => {
        handleClicked(false);
    }


    const handleClick = (el) => {
        setItem(el);
        handleClicked(true)
    }


    const loadMore = useCallback((entries) => {
        let target = entries[0]
        if (target.isIntersecting === true) {

            setCurrPage(prev => prev + 1);
        }

    }, [isFetching])



    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px 0px 300px 0px",
            thresold: [0, 1]
        }
        const observer = new IntersectionObserver(loadMore, options)

        if (cardRef.current) {
            observer.observe(cardRef.current)
        }

        return (() => {
            observer.unobserve(cardRef.current)
        })

    }, [cardRef.current, loadMore])


    const loadMoreCard = useCallback((entries) => {
        let target = entries[0]
        if (target.isIntersecting === true) {
            console.log('target.isIntersecting2', target)
            setIntersecting(true)
        }

    }, [])

    // useEffect(()=> {
    //     const options2 = {
    //         root: null,
    //         rootMargin: "0px 0px 300px 0px",
    //         thresold: [0, 1]
    //     }

    //     const observer2 = new IntersectionObserver(loadMoreCard, options2)

    //     if (singleCardRef.current) {
    //         observer2.observe(singleCardRef.current)
    //     }

    //     return (() => {
    //         observer2.unobserve(singleCardRef.current)
    //     })
    // }, [singleCardRef.current, loadMoreCard])


    return (
        <div className="searchResult_mainDiv" >
            {/* <DetailsUserCard item={item} /> */}
            {clicked === true &&
               <Modal item={item} />
            }

            {
                props.data.map((el) => {
                    return (

                        <div key={el.id} className="profile_div" onClick={() => handleClick(el)}>

                            <img src={el.image} className="profile_img" alt="profileimage" />
                            <p className="el_name">{el.name}</p>
                            <div>
                                <span className={el.status === "Alive" ? "span_alive" : "span_unknown"}></span>
                                <p>{el.status} - {el.species}</p>
                            </div>
                        </div>
                    )
                })
            }

            <div ref={cardRef} className={isFetching === false ? "display_none" : "display_block"} >...Loading</div>
        </div>

    )
}