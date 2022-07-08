import { useContext } from "react";
import { cardContext } from "../context/cardContext";
import "./detailsUserCard.css";


export const Modal = (props) => {

    const { handleClicked } = useContext(cardContext);

    const handleClose = () => {
        handleClicked(false);
    }

    return (

        <div className="detailsCard_mainDiv">
            <div className="details_profile">

                <span className="cross_symbol" onClick={handleClose}>✖</span>

                <div className="profile_upperDiv">
                    <img src={props.item.image} alt="profile_image" />
                    <div>
                        <h4>{props.item.name}</h4>
                        <div>
                            <span className={ props.item.status==="Alive"? "span_alive" : "span_unknown"}></span>
                            <p>{props.item.status} - {props.item.species}</p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="profile_lowerDiv">
                    <div>
                        <p className="grey_p">Gender</p>
                        <p className="black_p">{props.item.gender}</p>
                    </div>
                    <div>
                        <p className="grey_p">Location</p>
                        <p className="black_p">{props.item.location.name}</p>
                    </div>
                    <div>
                        <p className="grey_p">Species</p>
                        <p className="black_p">{props.item.species}</p>
                    </div>
                    <div>
                        <p className="grey_p">Origin</p>
                        <p className="black_p">{props.item.origin.name}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}