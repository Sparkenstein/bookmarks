import { Router } from "express";
import BookmarkModel from "../models/bookmark.model.js";

const bookmarkRouter = Router();

bookmarkRouter.get("/", async (req, res) => {
  const userId = req.user.id;

  const bookmarks = await BookmarkModel.find({ user: userId });
  //   same as:
  //   const user = await UserModel.find({ _id: userId })
  //   const bookmarks = await BookmarkModel.find({ user: user._id });

  res.json(bookmarks);
});

bookmarkRouter.post("/", async (req, res) => {
  const userId = req.user.id;
  const { link, name } = req.body;

  const bookmark = await BookmarkModel.create({ link, name, user: userId });
  res.status(201).json(bookmark);
});

export default bookmarkRouter;
