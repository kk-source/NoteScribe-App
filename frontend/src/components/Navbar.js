import React, { useContext } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

const Navbar = () => {
  const { User, getUser, setUser, loading } = useContext(NoteContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser("");
    navigate("/login");
  };

  useEffect(
    () => {
      (async () => {
        const user = await getUser();
        // Cannot use User state to check if it is updated or not because User will not be updated until the next render.
        if (user === "") {
          handleLogout();
        }
      })();
    },
    // eslint-disable-next-line
    []
  );

  if (loading) return <Spinner />;
  return (
    <nav className="navbar navbar-expand-lg dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          <img
            src="/Logo.png"
            alt="logo"
            height={50}
            className="px-2 text-light"
          />
          NoteScribe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/fndReq" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="fndReq"
                >
                  Friend Requests
                </Link>
              </li>
            )}
            {localStorage.getItem("token") && (
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/friends" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/friends"
                >
                  Friends
                </Link>
              </li>
            )}
            {localStorage.getItem("token") && (
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/shared" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/shared"
                >
                  Shared Notes
                </Link>
              </li>
            )}
            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("token") ? (
            <form className="d-flex">
              <span className="mx-1 navbar-text text-dark">Welcome {User}</span>
              <i className="fa-solid fa-right-from-bracket fa-2x mx-2" onClick={handleLogout}></i>
            </form>
          ) : (
            <form className="d-flex">
              <Link
                className="btn btn-light mx-1"
                to="/login"
                role="button"
              >
                Sign In
              </Link>
              <Link
                className="btn btn-light mx-1"
                to="/signup"
                role="button"
              >
                Sign Up
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
