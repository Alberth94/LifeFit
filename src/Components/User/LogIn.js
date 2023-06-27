import { Form, Button, Card } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, 
  signInWithPopup, sendPasswordResetEmail, FacebookAuthProvider } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";
import { app } from "../../Utils/FireBase";
import { useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from "react-social-login-buttons";
import { getFirestore, collection, addDoc, query, where, getDocs} from "firebase/firestore";

const db = getFirestore(app);
const usersCollectionRef = collection(db, 'users');
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function LogIn({ setUserOnOff, setExternalUserOnOff }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [forgetMessage, setForgetMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordReset = async () => {
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      setForgetMessage("A password reset email has been sent to your email address.");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setForgetMessage("");
      setMessage("Login successful. You are in!");
      setFailedAttempts(prevFailedAttempts => prevFailedAttempts -= failedAttempts);
      setMessageStyle({
        fontSize: "15px",
        color: "#00FF00",
      });
      setUserOnOff(true);
      handleNavigate ();
    } catch (error) {
      setMessageStyle({
        fontSize: "15px",
        color: "#eb2632",
      });
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/user-not-found") {
        setMessage(
          <>
            There is no account with this email address, sign up
            <Link to="/signup">here</Link>.
          </>
        );
        setMessageStyle({
          fontSize: "15px",
          color: "black",
        });
      } else if (errorCode === "auth/wrong-password") {
        setFailedAttempts(prevFailedAttempts => prevFailedAttempts + 1);
        setMessageStyle({
          fontSize: "15px",
          color: "#eb2632",
        });
        console.log(failedAttempts);
        setMessage(`❗ The password is incorrect.`);
        if (failedAttempts >= 3) {
          setMessageStyle({
            fontSize: "15px",
            color: "blue",
          });
          setMessage("");
          setForgetMessage("Forget password ?");
        }
      }
      console.log(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    await createAUserCollection ('google', googleProvider);
  };
  
  const handleFacebookSignIn = async () => {
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
      setMessageStyle({
        fontSize: "17px",
        color: "#00FF00",
      });
      setForgetMessage("");
      setMessage("Login successful. You are in!");
      handleNavigate ();
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setMessage('')
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="login-page">
      <Card className="login-card"> 
        <p className="welcome-log-in">Welcome</p>
        <Form className="login-form" onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="login-form-input"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`far ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePassword}
              ></i>
            </div>
              <p onClick={handlePasswordReset} style={messageStyle}>  {message}</p>
              <p style={messageStyle} onClick={handlePasswordReset} >{forgetMessage}</p>
              <p style={{fontSize:'17px'}}>Don't have an account? <Link to="/signup">
                Sign up
              </Link></p>
          </Form.Group>
          
          <Button className="login-custom-button " type="submit">
            Continue
          </Button>
          <br></br>
          <br></br>
          <h2><span>OR</span></h2>
          <Button className="btn-google-login" onClick={handleGoogleSignIn}>
            <span> Log in with Google</span>
          </Button>
          <br></br>
          <br></br>
          <div className="btn-facebook-login">
            <FacebookLoginButton onClick={handleFacebookSignIn}></FacebookLoginButton>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default LogIn;