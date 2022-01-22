import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Logout = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        localStorage.removeItem('token')
        toast("Logging out user!");
        setTimeout(() => navigate("/user/login"), 2000);
    })

    return (
        <>
            <h1>Logout Success!</h1>
        </>
    );
};

export default Logout;
