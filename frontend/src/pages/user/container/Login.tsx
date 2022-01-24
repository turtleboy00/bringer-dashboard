import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";


const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const PORT = process.env.REACT_APP_BE_PORT || 8000

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            navigate('/user/profile', {replace: true})
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (username && password) {

            await fetch(`http://localhost:${PORT}/user/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email:'' })
            })
                .then(res => {
                    if (res.status >= 400 && res.status < 600) {
                        throw Error(res.statusText)
                    }

                    return res.json()
                })
                .then(message => {
                    localStorage.setItem('token', JSON.stringify(message))
                    toast('Redirecting to user profile')
                    setTimeout(() => navigate('/user/profile'), 2000)
                })
                .catch((err) => {
                    console.log(err);
                    toast('Wrong credentials')
                });
        }
    };

    return (
        <>
            <h1 className="mt-2 mb-4">Login</h1>
            <ToastContainer />
            {
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            ref={usernameRef}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </Form.Group>
                    <Button type="submit" onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            }
        </>
    );
};

export default Login;
