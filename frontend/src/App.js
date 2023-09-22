import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import SpotsIndex from './components/Spots/index'
import SpotsDetail from './components/Spots/SpotsDetail'
import SpotForm from './components/Spots/SpotForm'
import SpotsCurrent from './components/Spots/SpotsCurrent'
import ManageReviews from './components/Reviews/ManageReviews'
import "./index.css"
import EditSpot from './components/Spots/EditSpot'
import { SpotBookings } from './components/Bookings/SpotBookings'
import { Calendar } from './components/Calendar'
import { getUserBookings } from './store/bookings'
import { UserBookings } from './components/Bookings/SpotBookings/UserBookings'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    < div className="root">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            < SpotsIndex />
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
          <Route exact path="/spots/:spotId/bookings">
            <SpotBookings />
          </Route>
          <Route exact path="/bookings/current">
            <UserBookings />
          </Route>
          <Route exact path='/spots/new'>
            <SpotForm />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditSpot />
          </Route>
          <Route exact path='/spots/current'>
            <SpotsCurrent />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotsDetail />
          </Route>
          <Route exact path='/reviews/current'>
            <ManageReviews />
          </Route>
        </Switch>
      )}
    </div>
  )
}

export default App;
