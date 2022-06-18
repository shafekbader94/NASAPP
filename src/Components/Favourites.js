import React from "react";
import MediaCard from "./MediaCard";

export default function Favourites(props) {
  console.log(props.favourites);

  return (
    <div>
      {props.favourites.map((f, i) => (
        <MediaCard
          imageData={f}
          id={f._id}
          explanation={f.explanation}
          key={i}
        />
      ))}
    </div>
  );
}
