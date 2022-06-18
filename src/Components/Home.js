import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaCard from "./MediaCard";

export default function Home() {
  // your code here
  const [imageOfDay, setImageOfDay] = useState("");

  useEffect(() => {
    async function loadData() {
      let image = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=rUPNSQU3cY5nWEh7J0y7MdhSyXZm8FaBqA8W8lAC"
      );
      setImageOfDay(image.data);
    }
    loadData();
  }, []);

  return <div>{imageOfDay && <MediaCard imageData={imageOfDay} />}</div>;
}
