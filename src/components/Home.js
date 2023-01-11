import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cardd } from "./Cardd";
import { Spinner } from "./Spinner";

export const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);



  useEffect(() => {
    axios.get(
      "https://telugu-skillhub-own-music-api-default-rtdb.firebaseio.com/music-api/-MdCU2vPsoSsulYD2akz.json")
      .then((res) => {
      !search
        ? setData(res.data)
        : setData(res.data.filter((songs) => songs.singer === search));
    });
  }, [search]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(search);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <h3 className="navbar-brand"> Telugu muiscal </h3>

          <form className="d-flex" onSubmit={onSubmit}>
            <input
              className="from-control me-2"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className="btn btn-outline-success"
              type="submit"
              value="search"
            />
          </form>
        </div>
      </nav>
      {data.length >= 1 ? (
        <center>
          <Cardd songs={data} />
        </center>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
