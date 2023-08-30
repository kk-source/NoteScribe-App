import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./Context/notes/NoteState";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import Alert from "./components/Alert.js";
import FndReq from "./components/FndReq.js";
import Friends from "./components/Friends.js";
import Shared from "./components/Shared.js";
import Error from "./components/Error.js";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/fndReq" element={<FndReq />} />
            <Route exact path="/friends" element={<Friends />} />
            <Route exact path="/shared" element={<Shared />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
