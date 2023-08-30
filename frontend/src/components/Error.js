import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

const About = () => {
  const { loading } = useContext(NoteContext);

  if (loading) return <Spinner />;
  return (
    <div className="container lighter p-3 rounded">
      <div className="container card w-50 light p-4">
        <h1>Error you have entered a wrong page.</h1>
      </div>
    </div>
  );
};
export default About;
