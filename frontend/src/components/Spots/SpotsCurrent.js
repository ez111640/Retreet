import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots";
import SpotsDetail from "./SpotsDetail";
import SpotInfo from "./SpotInfo";
import { useHistory, Link } from "react-router-dom";
import OpenModalButton from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal";



function SpotsCurrent() {

    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user)

    const allSpots = useSelector((state) => (
        state.spotsState
    ))
    let allSpotsArr;
    if (allSpots) allSpotsArr = Object.values(allSpots)

    const currentSpots = allSpotsArr.filter((spot) => spot.ownerId === sessionUser.id)



    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!currentSpots) return null;

    return (

        <div>
            <div className="manage-spots-header">
                <h1>Manage Spots</h1>

                <button className="create-spot-button" type="submit"><Link to="/spots/new">Create New Spot</Link></button>
            </div>
            <div className='spot-list'>
                <ul>
                    {currentSpots.length >= 0 ? currentSpots.map((spot) =>
                    (<li key={spot.id}>
                        <SpotInfo spotId={spot.id} />
                        <div className="delete-modal">
                            <button><OpenModalButton
                                itemText="Delete"
                                modalComponent={<DeleteSpotModal spotId={spot.id} />} /></button>
                            <button><Link to={`/spots/${spot.id}/edit`}>Update</Link></button>
                            <button><Link to={`/spots/${spot.id}/bookings`} thisSpot={spot}>Bookings</Link></button>
                        </div>
                    </li>)
                    )
                        : "No spots found"
                    }
                </ul>
            </div>
        </div>
    )
}


export default SpotsCurrent
