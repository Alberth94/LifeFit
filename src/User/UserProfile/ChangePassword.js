import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { getAuth, updatePassword } from "firebase/auth";
import { app } from '../../FireBase/FireBase';
import './ChangePassword.css'


const ChangePassword = ({userOnOff}) => {
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const auth = getAuth(app);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        updatePassword(user, newPassword).then(() => {
            setMessage('Update successful You have a new password');
            console.log("Update successful.");
        }).catch((error) => {
            console.log(error);
        });
    }

    if (userOnOff) {
        return (
            <div className="change-password-page">
            <Card className="change-password-card">
            <h3>Welcome</h3>
            <p>{message}</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>New Password</Form.Label>
                        <div className="password-input-container">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                            />
                            <i
                                className={`far ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                }`}
                                onClick={togglePassword}
                            ></i>
                        </div>
                    </Form.Group>
                    <Button type="submit" className="change-password-custom-button">
                        Continue
                    </Button>
                </Form>
            </Card>
            </div>
        );
    }
} 


export default ChangePassword;