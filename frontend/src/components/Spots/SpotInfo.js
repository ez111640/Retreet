import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./spots.css"
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../Navigation/OpenModalMenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";

function SpotInfo({ spotId }) {
    console.log("SPOTID", spotId)
    const dispatch = useDispatch()

    const allSpots = useSelector((state) => state.spotsState)
    const user = useSelector((state) => state.session.user)

    const allSpotArr = Object.values(allSpots)
    console.log("ALLSPOTARR", allSpotArr)

    console.log("ALLSPOTS", allSpotArr[0].id)
    const spot = allSpotArr.find((spot) => spot.id == spotId)
    console.log("SPOT", spot)


    let imageSrc;
    if (spot.previewImage.length > 25) imageSrc = spot.previewImage
    else imageSrc = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"

    if (!allSpotArr.length) return null

    return (
        <div className="spot-div"><Link to={`/spots/${spot.id}`}>
            <img src={imageSrc} alt="preview" title={spot.name} className="prevImage"></img>

            <div className="location-rating">
                <p className="spot-location">{spot.city},{spot.state}</p>
                <div className="spot-rating"><i className="fa-solid fa-star"></i><div>&#183;</div>{parseInt(spot.avgRating) ? parseInt(spot.avgRating).toFixed(2) : "New"}</div>
            </div>
            <div className="subtitle">
                <p className="spot-price"><span className="price-span">{`$${spot.price}`}</span> night</p>
            </div>
        </Link>
            {user.id === spot.userId &&
                <div className="delete-modal">
                    <button><OpenModalButton
                        itemText="Delete"
                        modalComponent={<DeleteSpotModal spotId={spot.id} />} /></button>
                    <button><Link to={`/spots/${spot.id}/edit`}>Update</Link></button>
                    <button><Link to={`/spots/${spot.id}/bookings`} spot={spot}>Bookings</Link></button>
                </div>
            }
        </div>

    )
}

export default SpotInfo
