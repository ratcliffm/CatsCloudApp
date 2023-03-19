import React from "react";
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import AdminPage from "./components/pages/AdminPage/AdminPage";
import "./App.css";

////////////////////
// Components
////////////////////

function App() {
    // Background color
    useEffect(() => {
        document.body.classList.add("background-color")
    })

    return (
    <div className="app">
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

