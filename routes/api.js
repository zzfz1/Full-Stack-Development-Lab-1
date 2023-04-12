import { Router } from "express";
export const router = Router();
import { Album } from "../models/album.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      res.json(await Album.find());
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .post(async (req, res) => {
    try {
      const newAlbum = {
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
      };
      const albums = await Album.find(newAlbum).exec();
      if (albums.length) {
        res.status(409).send("There's an identical album in the database!");
        return;
      }
      res.status(201).json(
        await new Album({
          _id: 1,
          ...newAlbum,
        }).save()
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

router.route("/:title").get(async (req, res) => {
  const searching = req.params.title;
  try {
    const albums = await Album.find({ title: searching }).exec();
    if (albums.length === 0) {
      res.status(404).send("No such album in the database!");
      return;
    }
    res.json(albums);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router
  .route("/:id")
  .all(async (req, res, next) => {
    const searching = req.params.id;
    let album = await Album.find({ _id: searching }).exec();
    if (album.length === 0) {
      res.status(404).send("No such album in the database!");
      return;
    }
    res.album = album[0];
    next();
  })
  .put(async (req, res) => {
    try {
      let album = res.album;
      album.title = req.body.title;
      album.artist = req.body.artist;
      album.year = req.body.year;
      const result = await album.save();
      res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .delete(async (req, res) => {
    try {
      let album = res.album;
      await album.deleteOne();
      res.json({ message: "Successfully Deleted!" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
