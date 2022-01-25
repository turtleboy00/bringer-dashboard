import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Card from "react-bootstrap/Card";
import { SiEbay, SiUps } from "react-icons/si";
import Table from "react-bootstrap/Table";

interface User {
    id: Number;
    username: string;
}

const Tracking = () => {
    const navigate = useNavigate();
    let [user, setUser] = useState<User>(null);
    let [packages, setPackages] = useState([]);
    let [selected, setSelected] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            const token = JSON.parse(localStorage.getItem("token"));
            const PORT = process.env.REACT_APP_BE_PORT;

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

    useEffect(() => {
        document.title = "Tracking: Dashboard";

        const getPackages = async () => {
            const PORT = process.env.REACT_APP_BE_PORT;

            await fetch(`http://localhost:${PORT}/delivery/`)
                .then((res) => {
                    if (res.status >= 400 && res.status < 600) {
                        throw Error(res.statusText);
                    }

                    return res.json();
                })
                .then((message) => {
                    setPackages(message["deliveries"]);
                })
                .catch((err) => console.warn(err));
        };

        getPackages();
    }, []);

    return (
        <>
            <h1>Tracking</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Carrier</th>
                        <th>Tracking Number</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.carrier_name}</td>
                                <td>{item.tracking_number}</td>
                                <td> ${item.price} </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
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

export default Tracking;
