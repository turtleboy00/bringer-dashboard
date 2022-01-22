import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Update = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);
    const { decodedToken } = useJwt(cookies.token);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/jwt/user");
    };

    const handleSave = async (event) => {
        event.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (decodedToken) {
            const id = decodedToken["id"];

            fetch(`http://${process.env.REACT_APP_BE_URL}:5000/jwt/update-user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, username, password }),
            })
                .then((res) => res.json())
                .then(() => {
                    navigate("/jwt/user");
                });
        }
    };

    useEffect(() => {
        if (!cookies.token) {
            navigate("/jwt/login");
        }
    }, [cookies.token, navigate]);

    return (
        <>
            <h1>Personal Info</h1>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Username
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            ref={usernameRef}
                            type="text"
                            placeholder="Username"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Password
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                        />
                    </Col>
                </Form.Group>
                <Button className="whitespace-normal mr-2" onClick={handleSave}>
                    Save
                </Button>
                <Button className="ml-2" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </>
    );
};

export default Update;
