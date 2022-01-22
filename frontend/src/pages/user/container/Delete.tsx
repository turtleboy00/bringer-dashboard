import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const Delete = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const { decodedToken } = useJwt(cookies.token);

    useEffect(() => {
        if (!cookies.token) {
            navigate("/jwt/login");
        }
    }, [cookies.token, navigate]);

    const handleAccept = (event) => {
        event.preventDefault();

        const deleteUser = async () => {
            await fetch(`http://${process.env.REACT_APP_BE_URL}:5000/jwt/delete-user`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: decodedToken["id"] }),
            }).then((message) => {
                removeCookie("token", {
                    path: "/",
                });
                navigate("/jwt/register");
            });
        };

        deleteUser();
    };

    const handleDecline = (event) => {
        event.preventDefault();

        navigate("/jwt/user");
    };

    return (
        <>
            <h1>Delete Account</h1>
            <Alert variant="danger">
                Are you sure you want to delete this account?
                <hr />
                <div>
                    <Button
                        variant="danger"
                        className="mx-2"
                        onClick={handleAccept}
                    >
                        Accept
                    </Button>
                    <Button variant="danger" onClick={handleDecline}>
                        Decline
                    </Button>
                </div>
            </Alert>
        </>
    );
};

export default Delete;
