import { csrfFetch } from "./csrf";


export const LOAD_BOOKINGS = 'bookings/loadBookings'
export const ADD_BOOKING = 'bookings/addBooking'
export const UPDATE_BOOKING = 'bookings/updateBooking'
export const DELETE_BOOKING = 'bookings/deleteBooking'

const loadBookings = bookings => ({

    type: LOAD_BOOKINGS,
    bookings

})

const addBooking = booking => ({
    type: ADD_BOOKING,
    booking
})

const updateBooking = booking => ({
    type: UPDATE_BOOKING,
    booking
})

const deleteBooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
})

export const getUserBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json();
        await dispatch(loadBookings(bookings.Bookings))
        return bookings
    } else {
        const err = await response.json();
        return err;
    }
}


export const getSpotBookings = (spotId) => async (dispatch) => {
    console.log("SPOTID", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`
    )
    console.log("RESPONSE", response)
    if (response.ok) {
        const bookings = await response.json();
        console.log("BOOKINGS", bookings)
        await dispatch(loadBookings(bookings.Bookings))
        return bookings
    } else {
        const err = await response.json();
        return err;
    }

}

export const createBookingThunk = (spotId, startDate, endDate) => async (dispatch) => {
    console.log("BOOKING", startDate, spotId, endDate)
    const booking = { startDate, endDate }
    console.log("BOOKING", booking)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        }

    )

    if (response.ok) {
        const newBooking = await response.json();
        await dispatch(addBooking(newBooking))
        return newBooking
    } else {
        const err = await response.json();
        return err;
    }
}

export const updateBookingThunk = (bookingId, startDate, endDate) => async (dispatch) => {
    const booking = { startDate, endDate }
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    if (response.ok) {
        const newBooking = await response.json();
        console.log("NEW", newBooking)
        await dispatch(addBooking(newBooking))
        return newBooking
    } else {
        const err = await response.json();
        return err;
    }
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })
    await dispatch(deleteBooking(bookingId))
}

const initialState = {

}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS:
            const bookingState = { ...state }
            action.bookings.forEach(
                (booking) => bookingState[booking.id] = booking
            )
            return bookingState
        case ADD_BOOKING:
            const newState = { ...state }
            newState[action.booking.id] = action.booking;
            return newState;
        case UPDATE_BOOKING:
            const editState = { ...state }
            editState[action.booking.id] = action.booking
        case DELETE_BOOKING:
            const deleteState = { ...state }
            delete deleteState[action.bookingId]
            return deleteState
        default:
            return state;
    }
}

export default bookingsReducer;
