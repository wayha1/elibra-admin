import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./component/Homepage/Homepage";
import { Book } from "./component/Book/Book";
import { Navbar } from "./Navbar";
import { Aboutus } from "./component/Aboutus/Aboutus";
function App() {
  return (
    <>
  <BrowserRouter>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Homepage />}></Route>
    <Route path="/aboutus" element={<Aboutus />}></Route>
    <Route path="/book" element={<Book />}></Route>
  </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;