import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import SharedNoteItem from "./SharedNoteItem";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Shared = () => {
  const { sharedNotes, getAllSharedNotes, loading } = useContext(NoteContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getAllSharedNotes();
      const b = localStorage.getItem("token");
      if (b != null) {
      } else {
        navigate("/login");
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className="container lighter p-3 rounded">
      <h2>Shared Notes</h2>
      <div className="container">
        {sharedNotes.length ? (
          <>
            <div className="input-group mb-3 w-25">
              <span
                className="input-group-text  bg-primary text-light"
                id="inputGroup-sizing-default"
              >
                Search
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={query}
                onChange={(e) => {
                  setQuery(() => e.target.value);
                }}
              />
            </div>
            <div className="row my-3">
              {sharedNotes
                .filter(
                  (note) =>
                    note.title.toLowerCase().indexOf(query.toLowerCase()) >
                      -1 ||
                    note.tag.toLowerCase().indexOf(query.toLowerCase()) > -1
                )
                .map((note) => (
                  <SharedNoteItem key={note._id} note={note} />
                ))}
            </div>
          </>
        ) : (
          <p>No notes to display</p>
        )}
      </div>
    </div>
  );
};

export default Shared;
