import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Spinner from "./Spinner";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteSharedNote, loading } = context;
  const { note } = props;
  if (loading) return <Spinner />;
  return (
    <>
      <div className="col-md-3">
        <div className="card light my-3" style={{ maxWidth: "540px" }}>
          <div className="card-body">
            <h5 className="card-title">From: {note.from}</h5>
            <h5 className="card-title">Title: {note.title}</h5>
            <p className="card-text">Description: {note.description}</p>
            {note.tag && (
              <p className="card-text text-body-secondary">Tag: {note.tag}</p>
            )}
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteSharedNote(note._id, note.to);
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
