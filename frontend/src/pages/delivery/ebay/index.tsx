import { Routes, Route } from "react-router-dom";
import Create from "./container/Create";
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

const EbayRouter = () => {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<Create />} />
        </Routes>
    );
};

export default EbayRouter;