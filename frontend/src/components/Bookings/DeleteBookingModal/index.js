import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/modal";
import { deleteBookingThunk } from "../../../store/bookings";
import { useEffect } from "react";
import "./deleteBookingModal.css"

const DeleteBookingModal = ({ bookingId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteBookingThunk(bookingId))
            .then(closeModal)
        history.push("/bookings/current")
    }


    return (

        <div className="confirm-delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to cancel this booking?</p>
            <button className="yes-delete-button" onClick={onSubmit} type="submit">Yes (Delete Spot)</button>
            <button className="no-delete-button">No (Keep Spot)</button>
        </div>
    )
}


export default DeleteBookingModal;
