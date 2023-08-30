import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Note from "./Note.js";
import AddNote from "./AddNote.js";

const Home = () => {
  const { loading } = useContext(NoteContext);
  return (
    <div className="container lighter p-3 rounded">
      <AddNote />
      <div>
        {!loading && <h1>Your notes</h1>}
        <Note />
      </div>
    </div>
  );
};
export default Home;
