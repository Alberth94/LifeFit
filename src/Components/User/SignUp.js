import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./SignUp.css";
import "font-awesome/css/font-awesome.min.css";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, 
  GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { app } from "../../Utils/FireBase";
import { getFirestore, collection, addDoc, query, where, getDocs} from "firebase/firestore";
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
        const querySnapshot = await query(collection(db, 'users'), where('userName', '==', username)).get();
        console.log(querySnapshot);
        if (querySnapshot.empty) {
          console.log('No documents found!');
          return false;
        } else {
          const firstDocument = querySnapshot.docs[0];
          const userData = firstDocument.data();
          const foundUserName = userData.userName;
          if (foundUserName === username) {
            setUserNameMessage("This username already exists. Please choose another one.");
            console.log(userNameMessage);
            return true;
          } else {
            console.log('Username not found!');
            return false;
          }
        }
      };
  
      const usernameExists = await checkIfUsernameExists(userName);
      if (!usernameExists) {
        setUserNameMessage('');
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
          handleNavigate ();
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

  const handleGoogleSignUp = async () => {
    await createAUserCollection('google', googleProvider);
  };
  
  const handleFacebookSignUp = async () => {
    await createAUserCollection('facebook', facebookProvider);
  };

  const handleNavigate = () => {
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }

  const checkIfUserExistNot = async () => {
    try {
      const currentUser = getAuth(app).currentUser;
      const userQuerySnapshot = await getDocs(query(usersCollectionRef, where("currentUserEmail", "==", currentUser.email)));
      if (userQuerySnapshot.empty) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const createAUserCollection = async(method, provider) => {
    try {
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (await checkIfUserExistNot()) {
        await addDoc(usersCollectionRef, {
          userName: user.displayName,
          currentUserEmail: user.email,
          authMethod: method,
          notes:'',
          avatarPhotoUrl: ''
        });
      }
      setExternalUserOnOff(true);
      setMessage('You are in!');
      handleNavigate ();
      setEmailMessage('');
      setUserNameMessage('');
      setExternalUserOnOff(true);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setMessage('')
      } else {
        console.error(error);
      }
    }
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
          <Button className="btn-google-signup" onClick={handleGoogleSignUp}>
            <span> Sign up with Google</span>
          </Button>
          <br></br>
          <br></br>
          <Button className="btn-facebook" onClick={handleFacebookSignUp}>
            <span> Sign up with Facebook</span>
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;