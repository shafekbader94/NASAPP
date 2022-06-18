import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@mui/material";
import ReactPlayer from "react-player";
import { CardMedia } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../App.css";
import { Button } from "@mui/material";

export default function MediaCard(props) {
  let title = props.imageData.title;
  let explanation = props.imageData.explanation;
  let media_type = props.imageData.media_type;
  let url = props.imageData.url;
  let id = props.id;
  let isInSeach = true;

  const [like, setLike] = useState(false);

  const location = useLocation().pathname;
  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    if (location.includes("/favourites")) {
      setLike(true);
    }
  }, []);

  const addToDB = async () => {
    let image = {
      title: title,
      url: url,
      explanation: explanation,
    };

    let theImagePost = await axios.post("http://localhost:4200/image", image);
    theImagePost = theImagePost.data;
    setLike(true);
  };

  const deleteFromDB = async () => {
    if (location === "/favourites") {
      let theImageDelete = await axios.delete(
        `http://localhost:4200/image/${id}`
      );
      theImageDelete = theImageDelete.data;
      setLike(false);
      refreshPage();
    } else {
      setLike(false);
    }
  };

  const cardClick = () => {
    if (location === "/favourites") {
      history.push(`/favourites/${id}`);
    }
  };

  if (location === "/search" || location === "/favourites") {
    isInSeach = true;
  } else {
    isInSeach = false;
  }

  return (
    <div className="mediaCards">
      <Card style={{ width: 400 }} sx={{ maxWidth: 345 }}>
        <div onClick={cardClick}>
          {media_type === "video" ? (
            <ReactPlayer url={url} />
          ) : (
            <CardMedia component="img" height="220" image={url} />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <h2>{title}</h2>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isInSeach ? " " : explanation}
            </Typography>
          </CardContent>
        </div>

        {like ? (
          <Button variant="outlined" onClick={deleteFromDB}>
            unlike
          </Button>
        ) : (
          <Button variant="outlined" onClick={addToDB}>
            like
          </Button>
        )}
        <Typography>
          <br></br>
        </Typography>
      </Card>
      <br></br>
    </div>
  );
}
