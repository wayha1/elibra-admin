import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./component/Homepage/Homepage";
import { Navbar } from "./Navbar";
import { Aboutus } from "./component/Aboutus/Aboutus";
import { Dashboard } from "./component/Dashboard/Dashboard";
import { Account } from "./component/account/Account";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/aboutus" element={<Aboutus />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
