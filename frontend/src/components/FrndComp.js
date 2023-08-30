import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

const ReqComp= (props)=>{
    const {  delFrnd } = useContext(NoteContext);
    const { email,note, shareNote, req } = props;

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{req.name}</div>
                    {req.email}
                </div>
                <button className="btn btn-primary" onClick={()=>{
                    shareNote(note,email)
                }}>Share Notes</button>
                <button className="btn btn-danger ms-3" onClick={()=>{
                    delFrnd(req.email)
                }}>Remove Friend</button>
            </li>
        </>
    );
};

export default ReqComp;
