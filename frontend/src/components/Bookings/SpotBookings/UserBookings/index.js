import { useDispatch, useSelector } from "react-redux"
import { getUserBookings } from "../../../../store/bookings"
import { useEffect } from "react"
import OpenModalButton from "../../../Navigation/OpenModalMenuItem"
import { UpdateBookingModal } from "../../UpdateBookingModal"
import DeleteBookingModal from "../../DeleteBookingModal"

export const UserBookings = () => {
    const dispatch = useDispatch()

    const bookings = Object.values(useSelector((state) => state.bookingsState))
    console.log("BOOKINGS", bookings)


    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    if (!bookings.length) return null


    const returnDate = date => {
        const update = date.split("-")
        const year = update[0]
        const month = update[1]
        const splitDate = update[2].split("T")
        const day = splitDate[0]
        return (`${month}/${day}/${year}`)


    }
    return (
        <div>
            {bookings.map((booking) => (
                <div key={booking.id}>
                    <div>Your upcoming stay in {booking.Spot.city},{booking.Spot.state}</div>
                    <div>Reservation at {booking.Spot.name}</div>
                    <div>Check in {returnDate(booking.startDate)}</div>
                    <div>Check out {returnDate(booking.endDate)}</div>
                    < br />
                    <button><OpenModalButton itemText="Update" modalComponent={<UpdateBookingModal booking={booking} />} /></button>
                    <button><OpenModalButton itemText="Cancel" modalComponent={<DeleteBookingModal bookingId={booking.id} />} /></button>
                </div>
            ))}
        </div>
    )
}
