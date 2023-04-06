import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
});

albumSchema.pre("save", async function (next) {
  const album = this;
  if (album.isNew) {
    const maxAlbum = await Album.findOne().sort("-id");
    album.id = maxAlbum ? maxAlbum.id + 1 : 1;
  }
  next();
});

export const Album = mongoose.model("Album", albumSchema);
