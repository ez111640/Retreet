import { csrfFetch } from './csrf'
export const LOAD_SPOTS = 'spots/loadSpots'
export const LOAD_SPOT = 'spots/loadSpot'
export const ADD_SPOT = 'spots/addSpot'
export const USER_SPOTS = 'spots/userSpots'
export const REMOVE_SPOT = 'spots/removeSpot'
export const UPDATE_SPOT = 'spots/updateSpot'
// export const LOAD_REVIEWS = '/spots/loadReviews'

export const loadSpots = spots => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const loadSpot = spotId => ({
    type: LOAD_SPOT,
    spotId
})

const addSpot = spot => ({
    type: ADD_SPOT,
    spot
})

const updateSpot = spot => ({
    type: UPDATE_SPOT,
    spot
})


export const removeSpot = spotId => ({
    type: REMOVE_SPOT,
    spotId
})

// export const loadReviews = reviews => ({
//     type: LOAD_REVIEWS,
//     reviews
// })

export const getAllSpots = () => async dispatch => {

    const response = await csrfFetch('/api/spots')
    if (response.ok) {
        const spots = await response.json();
        console.log("SPOTS", spots)
        spots.Spots.forEach(async (spot) => {
            const images = await csrfFetch(`/api/spots/${spot.id}/images`)
            const spotImages = await images.json();
            spot.images = spotImages.SpotImages
            const bookings = await csrfFetch(`/api/spots/${spot.id}/bookings`)
            const spotBookings = await bookings.json();
            spot.bookings = spotBookings.Bookings
        }
        )

        await dispatch(loadSpots(spots.Spots));
        return spots;
    } else {
        const err = await response.json();
        return err;
    }
}

export const getCurrentSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    if (response.ok) {
        const spots = await response.json();
        await dispatch(loadSpots(spots.Spots))
        return spots
    } else {
        const err = await response.json();
        return err;
    }
}
export const getOneSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json();
        await dispatch(loadSpot(spot.spot.id))
    } else {
        const err = await response.json();
        return err;
    }
}
export const postSpot = (spot, spotImages, user) => async dispatch => {
    const spotResponse = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })
    if (spotResponse.status < 400) {
        console.log("SPOT RESPONSE OKAY")
        const responseSpot = await spotResponse.json();
        const newSpot = responseSpot.newSpot
        newSpot.previewImage = [];
        let imgResponse;
        for (let i = 0; i < spotImages.length; i++) {
            imgResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(spotImages[i])
            })

            const image = await imgResponse.json();
            newSpot.previewImage.push(image)

        }
        if (imgResponse.ok) {
            newSpot.Owner = user;
            await dispatch(addSpot(newSpot))
            return newSpot
        } else {
            const err = await imgResponse.json();
            return err.response;
        }
    } else {
        console.log("DIDN'T RESPOND")
        const err = await spotResponse.json();
        console.log("ERR", err)
        return { err };
    }
}


// export const postSpot = (spot, spotImages, user) => async dispatch => {

//     const response = await csrfFetch(`/api/spots`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(spot)
//     })
//     if (response.ok) {
//     const newSpot = await response.json();
//     await dispatch(postImageNewSpot(newSpot.newSpot, spotImages, user));

//     return newSpot
// }
// const err = await response.json();
// return err.response;
// }

// export const postImageNewSpot = (spot, spotImages, user) => async dispatch => {
//     spot.previewImage = [];
//     let response;
//     for (let i = 0; i < spotImages.length; i++) {
//         response = await csrfFetch(`/api/spots/${spot.id}/images`, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(spotImages[i])
//         })

//             const image = await response.json();
//             spot.previewImage.push(image)

//     }
//     if(response.ok){
//     spot.Owner = user;
//     dispatch(addSpot(spot))
//     return spot}
//     else {
//         const err = await response.json();
//         return err.response;
//     }
// }

export const editSpot = (spot, spotImages, user) => async dispatch => {
    const spotId = spot.id
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            spot)
    })
    // if (response.ok) {
    const newSpot = await response.json();
    console.log("NEWSPOT", newSpot)
    if (newSpot) {
        await dispatch(updateSpot(newSpot, spotImages, user))
        await dispatch(updateSpot(spot))
    }
    // } else {
    //     const err = response.json();
    //     return err;
    // }
}
export const postImageUpdateSpot = (spot, spotImages, user) => async dispatch => {
    spot.previewImage = [];
    for (let i = 0; i < spotImages.length; i++) {
        const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(spotImages[i])
        })

        if (response.ok) {
            const image = await response.json();
            spot.previewImage.push(image)
        }
        spot.Owner = user;
        await dispatch(updateSpot(spot))
        return spot
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`,
        {
            method: 'DELETE'

        })
    await dispatch(removeSpot(spotId))

}
const initialState = {
}


const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = { ...state };
            action.spots.forEach(
                (spot) => spotsState[spot.id] = spot
            )
            return spotsState
        case LOAD_SPOT:
            newState = { ...state}
            return newState[action.spotId]
        case ADD_SPOT:
            newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        case REMOVE_SPOT:
            newState = { ...state }
            delete newState[action.spotId]
            return newState;

        case UPDATE_SPOT: {
            newState = { ...state}
            newState[action.spot.id] = action.spot
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
