import { useState } from "react";
import { DetailsUserCard } from "../Details User Card/detailsUserCard";
import "./basicUserCard.css";


export const BasicUserCard = (props) => {

    const [clicked, setClicked] = useState(false);
    const [item, setItem] = useState({})
    console.log('item', item)
    // console.log('clicked', clicked)

    const handleClick = (el) => {
        setItem(el);

    }

    return (
        <div className="searchResult_mainDiv">

            
        {
            props.data.map((el) => {
                // console.log('el', el)

                return (
                    <div key={el.id} className="profile_div" onClick={() => handleClick(el)}>
                        
                        <img src={el.image} className="profile_img" alt="profileimage" />
                        <p>{el.name}</p>
                        <div>
                            <span className={ el.status==="Alive"? "span_alive" : "span_unknown"}></span>
                            <p>{el.status} - {el.species}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
    )
}