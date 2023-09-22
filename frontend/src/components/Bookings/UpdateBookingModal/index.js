import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateBookingThunk } from "../../../store/bookings"
import { useEffect } from "react"
import { useModal } from '../../../context/modal'
import "./UpdateBookingModal.css"
import { useHistory } from "react-router-dom"

export const UpdateBookingModal = ({ booking }) => {
    const spots = useSelector((state) => state.spotsState)
    const bookings = useSelector((state) => state.bookingsState)
    const thisBooking = booking
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("SPOTID", booking.id)
        console.log("STARTDATe", startDate)
        console.log("ENDDATE", endDate)
        await dispatch(updateBookingThunk(booking.id, startDate, endDate))
            .then(window.location.reload())
            .then(closeModal)
    }

    return (

        <div className="CreateBookingModal">
            <div>Reserve this Spot</div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    >
                    </input>
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    >
                    </input>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
