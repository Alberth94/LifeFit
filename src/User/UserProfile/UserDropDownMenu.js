import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../FireBase/FireBase";
import SignOut from "./SignOut";
import { NavLink } from 'react-router-dom';
import './UserDropDownMenu.css';
import ProfilePic from "./ProfilePic";

const UserDropDownMenu = ({ userOnOff, setUserOnOff, setExternalUserOnOff, externalUserOnOff }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    if (userOnOff) {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      if (currentUser) {
        setCurrentUserEmail(currentUser.email);
        const postCollectionRef = collection(getFirestore(app), "users");
        getDocs(postCollectionRef).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.currentUserEmail === currentUser.email) {
              setCurrentUserName(data.userName);
            }
          });
        });
      }
    } else if (externalUserOnOff) {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      if (currentUser) {
        setCurrentUserEmail(currentUser.email);
        setCurrentUserName(currentUser.displayName);
      }
    } else {
      setCurrentUserName("");
    }
  }, [userOnOff, externalUserOnOff]);

  return userOnOff || externalUserOnOff ? (
    <div className="user-dropdown-menu">
      <ProfilePic  currentUserEmail={currentUserEmail} />
      <NavDropdown title={currentUserName} id="nav-dropdown-dark-example">
        <NavDropdown.Item>Notes</NavDropdown.Item>
        <NavDropdown.Item>Map</NavDropdown.Item>
        {externalUserOnOff === false ? (
          <NavDropdown.Item>
            <NavLink to="/changepassword">Change Password</NavLink>
          </NavDropdown.Item>
        ) : null}
        <SignOut setUserOnOff={setUserOnOff} setExternalUserOnOff={setExternalUserOnOff} />
      </NavDropdown>
    </div>
  ) : null;
}

export default UserDropDownMenu;