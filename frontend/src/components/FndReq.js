import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import ReqComp from "./ReqComp";
import SentRequest from "./SentRequest";
import SearchFrnd from "./SearchFrnd";

const FndReq = () => {
  const { getAllRec, getAllSent, recReq, loading } = useContext(NoteContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await getAllSent();
      await getAllRec();
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
      <div className="container-fluid my-3 card custom-width light p-4">
        <h2>ADD FRIENDS</h2>
        <SearchFrnd />
        <SentRequest />
        <h2>FRIEND REQUESTS</h2>
        {recReq.length ? (
          <>
            <p>
              {`${recReq.length} friend request${recReq.length > 1 ? "s" : ""}`}
            </p>
            <div className="input-group mb-3 custom-width">
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
            <ol className="list-group ">
              {recReq
                .filter(
                  (req) =>
                    req.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || req.email.toLowerCase().indexOf(query.toLowerCase()) > -1
                )
                .map((req) => (
                  <ReqComp key={req.email} req={req} />
                ))}
            </ol>
          </>
        ) : (
          <div className="container">
            <p>No friend requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FndReq;
