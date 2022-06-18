const express = require("express");
const router = express.Router();

const Image = require("../models/Image");

router.get("/images", async (req, res) => {
  const images = await Image.find({});
  res.send(images);
});

router.post("/image", async (req, res) => {
  const newImage = new Image(req.body);
  await newImage.save();
  res.send("saved");
});

router.delete("/image/:id", async (req, res) => {
  await Image.findByIdAndRemove(req.params.id);
  res.send("deleted");
});

module.exports = router;
