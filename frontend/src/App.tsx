import Router from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    

    return (
        <div className="App">
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
    );
};

export default App;
