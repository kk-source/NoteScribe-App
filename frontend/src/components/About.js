import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

const About = () => {
  const { loading } = useContext(NoteContext);
  if (loading) return <Spinner />;
  return (
    <div className="container lighter p-3 rounded">
      <div className="container card w-50 light p-4">
        <h1>This is about page</h1>
        <p>
          Welcome to our Notes App! At our Notes App, we strive to provide you
          with a powerful and user-friendly platform to capture, organize, and
          manage your thoughts, ideas, and important information. Whether you're
          a student, professional, or simply someone who loves to stay
          organized, our app is designed to be your go-to digital companion.
        </p>
      </div>
    </div>
  );
};
export default About;
