import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./SignUp.css";
import "font-awesome/css/font-awesome.min.css";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, 
  GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { app } from '../FireBase/FireBase';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);
const db = getFirestore(app);
const usersCollectionRef = collection(db, 'users');
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const SignUp = ({ setUserOnOff, setExternalUserOnOff }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const navigate = useNavigate();
  const errorStyle = {
    color: "red",
    fontSize: "14px"
}
  const successStyle = {
    color: '#00FF00',
    fontSize: '23px',
    textAlign: 'center'
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleUserName = (e) => {
    setUserName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordMessage('');
  
      const checkIfUsernameExists = async (username) => {
        const querySnapshot = await getDocs(usersCollectionRef);
        if (!querySnapshot || querySnapshot.empty) {
          console.log('No documents found!');
          return false;
        }
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (username === data.userName) {
            setUserNameMessage("This username already exists. Please choose another one.");
            console.log(userNameMessage);
            return true;
          }
        });
  
        if (!usernameExists) {
          setUserNameMessage('');
        }
        return false;
      }
  
      const usernameExists = await checkIfUsernameExists(userName);
      if (!usernameExists) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          await sendEmailVerification(user);
          await addDoc(usersCollectionRef, {
            userName: userName,
            currentUserEmail: user.email,
            authMethod: 'email_password',
            notes:'',
            avatarPhotoUrl: ''
          });
          window.localStorage.setItem('emailForSignIn', email);
          setUserOnOff(true);
          setMessage('You are in!');
          HandleNavigate ();
          setEmailMessage('');
          setUserNameMessage('');
        } catch (error) {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            setEmailMessage('User already exists with this email address!');
          } else {
            const errorMessage = error.message;
            console.log(errorMessage);
          }
        }
      } 
    } else {
      setPasswordMessage('Passwords don t match!')
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (await checkIfUserExistNot() === true) {
        await addDoc(usersCollectionRef, {
          userName: user.displayName,
          currentUserEmail: user.email,
          authMethod: 'google',
          notes:'',
          avatarPhotoUrl: ''
        });
      }
      setMessage('You are in!');
      HandleNavigate ();
      setEmailMessage('');
      setUserNameMessage('');
      setExternalUserOnOff(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      if (await checkIfUserExistNot() === true) {
        await addDoc(usersCollectionRef, {
          userName: user.displayName,
          currentUserEmail: user.email,
          authMethod: 'facebook',
          notes:'',
          avatarPhotoUrl: ''
        });
      }
      setExternalUserOnOff(true);
      setMessage('You are in!');
      HandleNavigate ();
      setEmailMessage('');
      setUserNameMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfUserExistNot = async() => {
    const documentRef = doc(usersCollectionRef, 'documentId');
    const usersCollectionSnapshot = await getDoc(documentRef);
    if (!usersCollectionSnapshot.exists()) {
      return true;
    }
    return false;
  }

  const HandleNavigate = () => {
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  }

  return (
    <div className="sign-up-page">
      <Card className="sign-up-card">
        <p className="welcome-sign-up">Welcome</p>
        <div style={successStyle}>{message}</div>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
            <Form.Text  style={errorStyle}>
              {emailMessage}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username"  value={userName} onChange={handleUserName} autoComplete="off"/>
            <Form.Text  style={errorStyle}>
              {userNameMessage}
            </Form.Text>
          </Form.Group>
            
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <i
                className={`far ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePassword}
              ></i>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Form.Text  style={errorStyle}>
              {passwordMessage}
            </Form.Text>
          </Form.Group>
         
          <Button type="submit" className="custom-button">
            Continue
          </Button>
          <br></br>
          <br></br>
          <h2><span>OR</span></h2>
          <Button className="btn-google-signup" onClick={handleGoogleSignIn}>
            <span> Sign up with Google</span>
          </Button>
          <br></br>
          <br></br>
          <Button className="btn-facebook" onClick={handleFacebookSignIn}>
            <span> Sign up with Facebook</span>
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;