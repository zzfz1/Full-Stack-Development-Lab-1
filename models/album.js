import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  _id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
});

albumSchema.pre("save", async function (next) {
  const album = this;
  if (album.isNew) {
    const maxAlbum = await Album.findOne().sort("-_id");
    album._id = maxAlbum ? maxAlbum._id + 1 : 1;
  }
  next();
});

export const Album = mongoose.model("Album", albumSchema);
