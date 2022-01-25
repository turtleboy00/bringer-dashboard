import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Table from "react-bootstrap/Table";

const Dashboard = () => {
    let [packages, setPackages] = useState([]);
    let [selected, setSelected] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "UPS: Dashboard";

        const getPackages = async () => {
            const PORT = process.env.REACT_APP_BE_PORT || 8000;

            await fetch(`http://localhost:${PORT}/delivery/ups/`)
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

    useEffect(() => {
        if (selected?.value.normalize() === "create") {
            navigate("/delivery/ups/create", { replace: true });
        }
    }, [navigate, selected]);

    const options = [
        { value: "create", label: "Create a label" },
        { value: "track", label: "Add tracking number" },
    ];

    const handleSelect = (selected) => {
        setSelected(selected);
    };

    return (
        <>
            <h1>Dashboard</h1>
            <Select
                value={selected}
                onChange={handleSelect}
                options={options}
                className="mb-4"
            />
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
        </>
    );
};

export default Dashboard;
