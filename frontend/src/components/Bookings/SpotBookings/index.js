import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getAllSpots } from "../../../store/spots"
import { getSpotBookings } from "../../../store/bookings"

export const SpotBookings = ({ spotId }) => {
    const dispatch = useDispatch()

    const allSpots = useSelector((state) => state.spotsState)
    const allSpotArr = Object.values(allSpots)
    console.log("ALLSPOTARR", allSpotArr)
    const thisSpot = allSpotArr[spotId]
    const bookings = Object.values(useSelector((state) => state.bookingsState))

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getSpotBookings(spotId))
    }, [dispatch])

    if (!allSpotArr.length) return null
    if (!thisSpot) return null

    return (
        <div>
            {
                bookings && bookings.length ?
                    <div>{bookings.spotId}</div> :
                    <div></div>
            }
        </div>
    )
}
