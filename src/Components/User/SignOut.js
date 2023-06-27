import { getAuth, signOut } from "firebase/auth";
import { Dropdown } from 'react-bootstrap';

const SignOut = ({setUserOnOff, setExternalUserOnOff}) => {
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
        setUserOnOff(false);
        setExternalUserOnOff(false);
        }).catch((error) => {
        console.log(error);
        });
    }
    return (
        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
    );
}

export default SignOut;