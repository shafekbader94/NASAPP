import React, { useState } from "react";
import axios from "axios";
import MediaCard from "./MediaCard";
import "../App.css";
import { Button } from "@mui/material";

export default function Search() {
  const [inputSearch, setInputSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const handleInput = (e) => {
    setInputSearch(e.target.value);
  };

  const handleButton = async () => {
    let searchResult = await axios.get(
      `https://images-api.nasa.gov/search?q=${inputSearch}&media_type=image`
    );

    searchResult = searchResult.data.collection.items.map((r) => {
      return {
        title: r.data[0].title,
        url: r.links[0].href,
        //id: r.data[0].nasa_id
        explanation: r.data[0].description,
      };
    });

    setResultSearch(searchResult);
  };

  document.body.style = "background: #50545b;";

  return (
    <div className="searchs">
      <input
        className="searchInput"
        name="search"
        placeholder="search"
        type="text"
        value={inputSearch}
        onChange={handleInput}
      />{" "}
      <Button variant="contained" onClick={handleButton}>
        search
      </Button>
      <div className="searchs">
        {resultSearch.map((r, i) => (
          <MediaCard key={i} imageData={r} />
        ))}
      </div>
    </div>
  );
}
