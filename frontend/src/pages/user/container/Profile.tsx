import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Card from "react-bootstrap/Card";
import { SiEbay, SiUps } from "react-icons/si";

interface User {
    id: Number;
    username: string;
}

const Profile = () => {
    const navigate = useNavigate();
    let [user, setUser] = useState<User>(null);

    useEffect(() => {
        const checkLogin = async () => {
            const token = JSON.parse(localStorage.getItem("token"));
            const PORT = process.env.REACT_APP_BE_PORT || 8000;

            let headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token["access"]}`,
            };

            if (!token) {
                navigate("/user/login", { replace: true });
            } else {
                await fetch(`http://localhost:${PORT}/user/`, {
                    headers,
                })
                    .then((res) => {
                        console.warn("First Request");

                        if (res.status >= 400 && res.status < 600) {
                            throw new Error(res.statusText);
                        }

                        return res.json();
                    })
                    .then((message) => {
                        setUser(message["user"]);
                    })
                    .catch(async (err) => {
                        console.warn(`Attempting again ${err}...`);
                        const { refresh } = JSON.parse(
                            localStorage.getItem("token")
                        );

                        await fetch(
                            `http://localhost:${PORT}/user/refresh-token/`,
                            {
                                headers,
                                method: "POST",
                                body: JSON.stringify({ refresh }),
                            }
                        )
                            .then(async (res) => res.json())
                            .then(async (message) => {
                                headers[
                                    "Authorization"
                                ] = `Bearer ${message["access"]}`;

                                await fetch(`http://localhost:${PORT}/user/`, {
                                    headers,
                                })
                                    .then((res) => {
                                        if (
                                            res.status >= 400 &&
                                            res.status < 600
                                        ) {
                                            throw new Error(res.statusText);
                                        }
                                    })
                                    .then((message) => {
                                        setUser(message["user"]);
                                    })
                                    .catch((err) => {
                                        localStorage.removeItem("token");
                                        navigate("/user/login", {
                                            replace: true,
                                        });
                                    });
                            });
                    });
            }
        };

        checkLogin();
        toast("User logged in!");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Profile</h1>
            <ToastContainer />
            <div className="d-flex justify-content-around mb-4">
                <Card style={{ width: "18rem" }}>
                    <Card.Img
                        variant="top"
                        data-src={`holder.js/300x200`}
                        alt="User profile"
                        width="300"
                        height="200"
                    />
                    <Card.Body>
                        <Card.Title>Welcome</Card.Title>
                        {user && (
                            <>
                                <Card.Text className="mb-0">
                                    Username: {user.username}
                                </Card.Text>
                                <Card.Text className="mb-3">
                                    Id: {user.id}
                                </Card.Text>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </div>
            <div className="d-flex flex-wrap justify-items-center gap-3 justify-center mb-4">
                <Card
                    style={{ width: "12rem" }}
                    className="items-center hover:cursor-pointer"
                    onClick={() => navigate("/delivery/ebay")}
                >
                    <Card.Body>
                        <Card.Text>
                            <SiEbay size="4em" />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    style={{ width: "12rem" }}
                    className="items-center hover:cursor-pointer"
                    onClick={() => navigate("/delivery/ups")}
                >
                    <Card.Body>
                        <Card.Text>
                            <SiUps size="4em" />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default Profile;
