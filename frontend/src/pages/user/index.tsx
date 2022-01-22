import { Routes, Route } from "react-router-dom";
import Login from "./container/Login";
import Register from "./container/Register";
import Tracking from "../delivery/containers/Tracking";
import Update from "./container/Update";
import Profile from "./container/Profile";
import Logout from "./container/Logout";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            JwtRouter: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

const ProfileRouter = () => {
    return (
        <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="update" element={<Update />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
        </Routes>
    );
};

export default ProfileRouter;