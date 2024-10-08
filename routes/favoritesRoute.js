const express = require("express");
const favoriteController = require("../controllers/favoritesController");
// const authMiddleware = require("../middleware/authMiddleware");
const Router = express.Router();

Router.get("/getfavorites", favoriteController.getFavorites);
Router.post("/createfavorites", favoriteController.postFavorites);
Router.delete("/deletefavorite/:id", favoriteController.deleteFavorite);

module.exports = Router;