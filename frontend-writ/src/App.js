import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { Create } from "./pages/admin/Create";
import WritRoutes from "./routes/WritRoutes.js";
import ScheduleRoutes from "./routes/ScheduleRoutes.js";
import { WritProvider } from "./pages/institutionalMemory/context/WritContext.js";
import Law from "./pages/law/Law";
import AddLawSituation from "./pages/law/AddLawSituation";
import Compliance from "./pages/compliance/Compliance";
import Search from "./pages/search/Search";
import { Scheme } from "./pages/scheme/Scheme";


function App() {
    return (
        <BrowserRouter>
            <WritProvider>
                <Routes>
                <Route path="/" element={<Login />}/>
                    <Route path="/admin" element={<Create />}></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/user/" element={<Home />} />
                    <Route path="/user/home" element={<Home />} />
                    <Route path="/user/wp/*" element={<WritRoutes />} />
                    <Route path="/user/schedule/*" element={<ScheduleRoutes/>}/>
                    <Route path="/user/law" element={<Law />} />
                    <Route path="/uses/law/add" element={<AddLawSituation />} />
                    <Route path="/user/compliance" element={<Compliance />} />
                    <Route path="/user/scheme" element={<Scheme />} />
                    <Route path="/user/search" element={<Search />} />
                </Routes>
            </WritProvider>
        </BrowserRouter>
    );
}

export default App;