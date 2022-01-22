import { Routes, Route } from "react-router-dom";
import Create from "./container/Create";
import Label from "./container/Label";
import Dashboard from "./container/Dashboard";

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

const UpsRouter = () => {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<Create />} />
            <Route path="label" element={<Label />} />
        </Routes>
    );
};

export default UpsRouter;