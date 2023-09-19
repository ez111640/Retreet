import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './navigation.css';
import { useState } from 'react';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showExpandedNav, setShowExpandedNav] = useState(false)
  const [whereOption, setWhereOption] = useState("eso-active")
  const [startOption, setStartOption] = useState("eso-inactive")
  const [endOption, setEndOption] = useState("eso-inactive")
  const [whoOption, setWhoOption] = useState("eso-inactive")
  const [activeWhere, setActiveWhere] = useState(false)
  const [activeStart, setActiveStart] = useState(false)
  const [activeEnd, setActiveEnd] = useState(false)
  const [activeWho, setActiveWho] = useState(false)

  const handleLocationSearch = (e) => {
    console.log("HERE")
    e.preventDefault()
    setShowExpandedNav(!showExpandedNav)
  }

  const extendMakeActiveWhere = (e) => {
    e.preventDefault()
    if (whereOption === "eso-inactive") setWhereOption("eso-active")
    setActiveStart(false)
    setActiveWhere(false)
    setStartOption("eso-inactive")
  }

  const extendMakeActiveStart = (e) => {
    e.preventDefault()
    if (startOption === "eso-inactive") setStartOption("eso-active")
    else setStartOption("eso-inactive")
    setActiveWhere(true)
    setActiveStart(!activeStart)
    setWhereOption("eso-inactive")
  }

  const extendMakeActiveEnd = (e) => {
    e.preventDefault();
    if (endOption === "eso-inactive") setEndOption("eso-active")
    setActiveWhere(true)
    setActiveStart(true)
    setActiveWho(true)
    setActiveEnd(false)
    setWhereOption("eso-inactive")
    setStartOption("eso-inactive")
    setWhoOption("eso-inactive")


  }

  const extendMakeActiveWho = (e) => {
    e.preventDefault();
    if (whoOption === "eso-inactive") setWhoOption("eso-active")
    setActiveWhere(true)
    setActiveStart(true)
    setActiveEnd(true)
    setActiveWho(false)
    setWhereOption("eso-inactive")
    setStartOption("eso-inactive")
    setEndOption("eso-inactive")

  }

  return (
    <div className="navigation">
      <ul className="nav-bar">
        <li className="leftNav">
          <NavLink exact to="/">
            <i className="fa-solid fa-tree">
              Retreets</i></NavLink>
        </li>
        {!showExpandedNav ?
          <li className="search-bar">
            <div onClick={handleLocationSearch}>Anywhere</div>
            <div id="search-bar-dates">Any week</div>
            <div id="search-bar-guests">Add guests</div>
            <div className="search-button" ><i className="fa-solid fa-magnifying-glass"></i></div>
          </li> :
          <li className="search-bar">
            <div>Stays</div>
            <div>Experiences</div>
            <div>Online Experiences</div>
          </li>
        }
        <div onClick={handleLocationSearch}>Close this</div>
        {isLoaded && (
          <div className="rightNav">
            <li>{sessionUser && <NavLink exact to="/spots/new">Retreet your Home</NavLink>}</li>
            <li >
              <ProfileButton user={sessionUser} />
            </li>
          </div>
        )}
      </ul>
      {showExpandedNav &&
        <ul className="extend-search">
          <li>
            <ul className="where-div">
              <li onClick={extendMakeActiveWhere} className={"eso-where " + whereOption}>
                <div className="extend-search-option-title">Where</div>
                <input className="searchDestInput extend-search-option-sub" type="text" placeholder="Search destinations"></input>
              </li>
              {activeWhere ? <li></li> :
                <li className="region-div">
                  <div>Search by region</div>
                  <div className="location-photos">
                    <div>
                      <img className="location-img" src="https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg"></img>
                      <div>I'm flexible</div>
                    </div>
                    <div>
                      <img className="location-img" src="https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320"></img>
                      <div>Europe</div>
                    </div>
                    <div>
                      <img className="location-img" src="https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320"></img>
                      <div>Italy</div>
                    </div>
                    <div>
                      <img className="location-img" src="https://a0.muscache.com/im/pictures/c61d10f5-4ab3-4d16-bed7-0449e15c8277.jpg?im_w=320"></img>
                      <div>Caribbean</div>
                    </div>
                    <div>
                      <img className="location-img" src="https://a0.muscache.com/im/pictures/cd9f2bf0-eefc-4980-b7cb-9c8ca3dae883.jpg?im_w=320"></img>
                      <div>Canada</div>
                    </div>
                    <div>
                      <img className="location-img" src="https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320"></img>
                      <div>South America</div>
                    </div>
                  </div>
                </li>
              }
            </ul>
          </li>
          <li  className={"eso-where " + startOption}>
            <ul>
              <li onClick={extendMakeActiveStart}>
                <div className="extend-search-option-title">Check in</div>
                <div className="extend-search-option-sub" >Add dates</div>
              </li>
              {!activeStart ? <li></li> :
              <li className="start-div">
                <input type="date"></input>
              </li>
              }
            </ul>
          </li>
          <li onClick={extendMakeActiveEnd}>
            <div className="extend-search-option-title">Check out</div>
            <div className="extend-search-option-sub" >Add dates</div>
          </li>
          <li onClick={extendMakeActiveWho}>
            <div className="extend-search-option-title">Who</div>
            <div className="extend-search-option-sub" >Add guests</div>
          </li>
          <div className="search-button"><i className="fa-solid fa-magnifying-glass"></i></div>
        </ul>
      }
    </div >
  );
}

export default Navigation;
