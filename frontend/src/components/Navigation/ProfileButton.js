import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignUpFormModal'
import "./profileButton.css"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? " notHidden" : " hidden");

  return (
    <div className = 'profile-button'>
      <button className = "user-menu" onClick={openMenu}>
      <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-circle-user" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className ='dropdown-menu'>
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
            <hr />
            <li><Link to="/spots/current">Manage Spots</Link></li>
            <li><Link to="/reviews/current">Manage Reviews</Link></li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className ='dropdown-menu'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
