import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";
const host = process.env.REACT_APP_HOST;

export default function Signup() {
  const { showAlert, setUser, loading, getUser } = useContext(NoteContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(
    () => {
      (async () => {
        const user = await getUser();
        if (user !== "") {
          navigate("/");
        }
      })();
    },
    // eslint-disable-next-line
    []
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.Success) {
        localStorage.setItem("token", json.authtoken);
        showAlert("Account Created Successfully", "success");
        setUser(data.name);
        navigate("/");
        //   console.log(json);
      } else {
        showAlert("Something went wrong...", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  if (loading) return <Spinner />;
  return (
    <div className="container lighter p-3 rounded">
      <form className="container my-1 card custom-width p-4 light">
        <h1>Signup to NoteScribe</h1>
        <div className="form-group my-2">
          <label htmlFor="exampleInputName1">Name</label>
          <input
            type="name"
            name="name"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={handleChange}
            value={data.name}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
            value={data.email}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-light my-4 w-50 m-auto"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
