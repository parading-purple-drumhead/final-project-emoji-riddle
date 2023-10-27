import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app bg-light" style={{ height: "100vh" }}>
      <Navbar />
      <div className="container">
        <div className="row">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
