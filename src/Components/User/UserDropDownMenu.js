import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { collection, getFirestore, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../Utils/FireBase";
import SignOut from "./SignOut";
import { NavLink } from 'react-router-dom';
import './UserDropDownMenu.css';
import ProfilePic from "./ProfilePic";
const db = getFirestore(app);

const UserDropDownMenu = ({ userOnOff, setUserOnOff, setExternalUserOnOff, externalUserOnOff }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    if (userOnOff) {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      const getUserName = async () => {
        try {
          const querySnapshot = await getDocs(query(collection(db, 'users'), where('currentUserEmail', '==', currentUser.email)));
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const userName = doc.data().userName;
            const userEmail = doc.data().currentUserEmail;
            setCurrentUserName(userName);
            setCurrentUserEmail(userEmail);
          } 
        } catch (error) {
          console.error(error);
        }
      };
      getUserName();
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
        <NavDropdown.Item>
          <NavLink style={{color: 'black'}} to="/userroute">Map</NavLink>
        </NavDropdown.Item>
        {externalUserOnOff === false ? (
          <NavDropdown.Item>
            <NavLink style={{color: 'black'}} to="/changepassword">Change Password</NavLink>
          </NavDropdown.Item>
        ) : null}
        <SignOut setUserOnOff={setUserOnOff} setExternalUserOnOff={setExternalUserOnOff} />
      </NavDropdown>
    </div>
  ) : null;
}

export default UserDropDownMenu;