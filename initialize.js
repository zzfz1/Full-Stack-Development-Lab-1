import { Album } from "./models/album.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const album1 = await new Album({
  _id: 1,
  title: "The Dark Side of the Moon",
  artist: "Pink Floyd",
  year: 1973,
}).save();

const album2 = await new Album({
  _id: 1,
  title: "Abbey Road",
  artist: "The Beatles",
  year: 1969,
}).save();

const album3 = await new Album({
  _id: 1,
  title: "Thriller",
  artist: "Michael Jackson",
  year: 1982,
}).save();

const album4 = await new Album({
  _id: 1,
  title: "Nevermind",
  artist: "Nirvana",
  year: 1991,
}).save();

const album5 = await new Album({
  _id: 1,
  title: "Rumours",
  artist: "Fleetwood Mac",
  year: 1977,
}).save();

const album6 = await new Album({
  _id: 1,
  title: "The Queen is Dead",
  artist: "The Smiths",
  year: 1986,
}).save();

const album7 = await new Album({
  _id: 1,
  title: "Exile on Main St.",
  artist: "The Rolling Stones",
  year: 1972,
}).save();

const album8 = await new Album({
  _id: 1,
  title: "Appetite for Destruction",
  artist: "Guns N' Roses",
  year: 1987,
}).save();

const album9 = await new Album({
  _id: 1,
  title: "Ten",
  artist: "Pearl Jam",
  year: 1991,
}).save();

const album10 = await new Album({
  _id: 1,
  title: "The Joshua Tree",
  artist: "U2",
  year: 1987,
}).save();

console.log("done");
