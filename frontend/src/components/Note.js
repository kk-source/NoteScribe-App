import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function Note() {
  const { notes, getAllNotes, editNote, loading } = useContext(NoteContext);
  const [query, setQuery] = useState("");
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const ref = useRef(null);
  const closeRef = useRef(null);
  const navigate = useNavigate();

  // Simply running getAllNotes() will result into infinite loop. See here : https://www.datainfinities.com/20/too-many-re-renders-react-limits-the-number-of-renders-to-prevent-an-infinite-loop
  useEffect(() => {
    (async () => {
      await getAllNotes();
      const b = localStorage.getItem("token");
      if (b != null) {
      } else {
        navigate("/login");
      }
    })();
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  };

  const handleChange = (e) => {
    setNote((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClick = () => {
    editNote(note);
    closeRef.current.click();
  };

  if (loading) return <Spinner />;
  return (
    <>
      <div className="input-group mb-3 w-25">
        <span
          className="input-group-text bg-primary text-light"
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
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
              note.tag.toLowerCase().indexOf(query.toLowerCase()) > -1
          )
          .map((note) => (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          ))}
      </div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content light">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form className="container">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={note.title}
                  onChange={handleChange}
                  required
                  minLength={3}
                />
                <div id="titleHelp" className="form-text">
                  Minimum 3 characters long
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  name="description"
                  value={note.description}
                  onChange={handleChange}
                  required
                  minLength={5}
                ></textarea>
                <div id="descriptionHelp" className="form-text">
                  Minimum 3 characters long
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  value={note.tag}
                  name="tag"
                  onChange={handleChange}
                />
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={handleClick}
                disabled={note.title.length < 3 || note.description.length < 5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
