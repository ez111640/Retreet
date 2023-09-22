import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, postImage, postSpot } from "../../store/spots";
import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { editSpot } from "../../store/spots";
import "./form.css"
import { getOneSpot } from "../../store/spots";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function EditSpot() {
    const allSpots = useSelector(state => state.spotsState)
    console.log("ALLSPOTS", allSpots)
    let spots
    let spot
    if (allSpots) spots = Object.values(allSpots)
    const { spotId } = useParams();
    console.log("SPOTS", spots)

    console.log("SPOTID", spotId)

    if (spots.length) {
        for (let i = 0; i < spots.length; i++) {
            if (spots[i]?.id == spotId) {
                spot = spots[i]
            }
        }
    }
    console.log("SPOT", spot)
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [lng, setLng] = useState(spot?.lng);
    const [lat, setLat] = useState(spot?.lat);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [address, setAddress] = useState(spot?.address);
    const [country, setCountry] = useState(spot?.country);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);

    const dispatch = useDispatch();


    const [imgOne, setImgOne] = useState(spot?.images ? spot.images[0]?.url : null);
    const [imgTwo, setImgTwo] = useState(spot?.images ? spot.images[1]?.url : null);
    const [imgThree, setImgThree] = useState(spot?.images ? spot.images[2]?.url : null);
    const [imgFour, setImgFour] = useState(spot?.images ? spot.images[3]?.url : null)
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();




    const handleSubmit = async (e) => {
        e.preventDefault();
        let spotImages = [
            {
                url: previewImage ? previewImage : spot.previewImage,
                preview: true
            },
            {
                url: imgOne ? imgOne : spot.images[0],
                preview: false
            },
            {
                url: imgTwo ? imgTwo : spot.images[1],
                preview: false
            },
            {
                url: imgThree ? imgThree : spot.images[2],
                preview: false
            },
            {
                url: imgFour ? imgFour : spot.images[3],
                preview: false
            }
        ]
        const updatedSpot = {
            name,
            description,
            lng, lat,
            city, state,
            address,
            country,
            price,
            id: spotId
        }



        await dispatch(editSpot(updatedSpot, spotImages, sessionUser))
        history.push(`/spots/${spotId}`)


    }

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    if(!spot) return null
    if (!spots.length) return null
    return (
        <div className="form-container">
            <div className="spot-form-header">
                <h1>Edit a spot</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-inputs">
                        <div className="location">
                            <div>
                                <label>
                                    Country
                                </label>
                                <input type="text" value={country}
                                    onChange={e => setCountry(e.target.value)} required="required"></input>
                                <label>
                                    Address
                                </label>
                                <input type="text" value={address}
                                    onChange={e => setAddress(e.target.value)} required="required"></input>
                            </div>
                            <div className="city-state-lat-lng">
                                <div className="city-state">
                                    <label>
                                        City
                                    </label>
                                    <label>
                                        State
                                    </label>

                                    <input type="text" value={city}
                                        onChange={e => setCity(e.target.value)} required="required"></input>
                                    <input type="text" value={state}
                                        onChange={e => setState(e.target.value)} required="required"></input>
                                </div>
                                <div className="lat-lng">
                                    <label>
                                        Latitude
                                    </label>
                                    <label>
                                        Longitude
                                    </label>
                                    <input type="number" value={lat}
                                        onChange={e => setLat(e.target.value)}></input>
                                    <input type="number" value={lng}
                                        onChange={e => setLng(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                        < hr />
                        <div className="description">
                            <h3>Describe your place to guests</h3>
                            <h5>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h5>

                            <textarea type="text" value={description}
                                onChange={e => setDescription(e.target.value)} required="required"></textarea>

                        </div>
                        <hr />
                        <h3>Create a title for your spot</h3>
                        <h5>Catch guests' attention with a spot title that highlights what makes your place special.</h5>

                        <input type="text" value={name}
                            onChange={e => setName(e.target.value)} required="required"></input>
                        <hr />
                        <div className='cost'>
                            <h3>Set a base price for your spot</h3>
                            <h5>Competitive pricing can help your listing stand out and rank higher in search results.</h5>
                            <label>
                                $
                                <input type="text" value={price} required="required"
                                    onChange={e => setPrice(e.target.value)}></input>
                            </label>
                        </div>
                        <hr />
                        <div className='photos'>
                            <h3>Liven up your spot with photos</h3>
                            <h5>Submit at least one photo to publish your spot.</h5>
                            <input type="text" value={previewImage} required="required"
                                onChange={e => setPreviewImage(e.target.value)}></input>
                            <input type="text" value={imgOne}
                                onChange={e => setImgOne(e.target.value)}></input>

                            <input type="text" value={imgTwo}
                                onChange={e => setImgTwo(e.target.value)}></input>

                            <input type="text" value={imgThree}
                                onChange={e => setImgThree(e.target.value)}></input>

                            <input type="text" value={imgFour}
                                onChange={e => setImgFour(e.target.value)}></input>

                        </div>
                        < hr />
                        <div className='form-submit-button-container'>
                            <button className="form-submit-button" type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}


export default EditSpot;
