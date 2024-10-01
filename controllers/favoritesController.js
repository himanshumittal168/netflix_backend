const Favorites = require("../models/favoritesModel");
const mongoose = require("mongoose");

const getFavorites = async (req, res) => {
  try {
    const { email } = req.headers;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const favorites = await Favorites.find({ email }).sort({ createdAt: -1 });
    return res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postFavorites = async (req, res) => {
  const { email } = req.headers;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = req.body;

  try {
    const existingFavorite = await Favorites.findOne({ email, id });
    if (existingFavorite) {
      return res.status(409).json({ message: "Movie is already in favorites" });
    }

    const favorite = new Favorites({
      email,
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await favorite.save();
    return res
      .status(201)
      .json({ message: "Successfully Added to Favorites", favorite });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  const { email } = req.headers;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const isValid = await Favorites.find({ id });
    if(!isValid) {
      return res.status(404).json({ message: "Movie not found in Favorites" });
    }
    const favorite = await Favorites.findOneAndDelete({
      id: Number(id),
      email,
    });
    if (!favorite) {
      return res.status(404).json({ message: "Movie not found in Favorites" });
    }
    return res
      .status(200)
      .json({ message: "Movie deleted from Favorites" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getFavorites, postFavorites, deleteFavorite };
