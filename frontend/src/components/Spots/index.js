
import { getAllSpots } from '../../store/spots.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import "./spots.css"
import SpotInfo from './SpotInfo.js'
import { Link } from 'react-router-dom';
import { getUserBookings } from '../../store/bookings.js';

function SpotsIndex() {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => (
        state.spotsState
    ))
    const spotsArr = Object.values(allSpots)

    console.log("SPOTSARR", spotsArr)

    const sessionUser = useSelector(state => state.session.user);

    // let imageSrc;
    // if (spot.previewImage.length > 25) imageSrc = spot.previewImage
    // else imageSrc = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"



    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    if (!spotsArr.length) return null;
    return (

        <div className="spot-list">
            <ul >
                {spotsArr && spotsArr.map((spot) => (
                    <li className="spotList" key={spot.id}>
                        {spot.previewImage && <Link to={`/spots/${spot.id}`} ><img src={spot.previewImage} alt="preview" title={spot.name} className="prevImage" /></Link>}

                        <div className="location-rating">
                            <p className="spot-location">{spot.city},{spot.state}</p>
                            <div className="spot-rating"><i className="fa-solid fa-star"></i><div>&#183;</div>{parseInt(spot.avgRating) ? parseInt(spot.avgRating).toFixed(2) : "New"}</div>
                        </div>
                        <div className="subtitle">
                            <p className="spot-price"><span className="price-span">{`$${spot.price}`}</span> night</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div >)
}



export default SpotsIndex;
