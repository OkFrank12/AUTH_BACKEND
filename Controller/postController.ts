import { Request, Response } from "express";
import cloudinary from "../Config/cloudinary";
import authModel from "../Model/authModel";
import postModel from "../Model/postModel";
import mongoose from "mongoose";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const { title, content, category } = req.body;
    const authUser: any = await authModel.findById(authID);
    const post = await postModel.create({
      title,
      content,
      category,
      image: secure_url,
      imageID: public_id,
      user: authUser,   
    });
    authUser?.post?.push(new mongoose.Types.ObjectId(post._id));
    authUser.save();

    return res.status(201).json({
      message: "Success: createPost",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const readPostCategory = async (req: Request, res: Response) => {
  try {
    const makeSearch = req.query.search
      ? {
          $or: [{ category: { $regex: req.query.search, $options: "i" } }],
        }
      : {};

    const post = await postModel.find(makeSearch);

    return res.status(200).json({
      message: `See post related to ${makeSearch}`,
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const readUserPost = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const post = await postModel.findById(authID).populate({
      path: "post",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });
    return res.status(200).json({
      message: "Success: readUserPost",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { authID, postID } = req.params;

    const auth = await authModel.findById(authID);
    const post: any = await postModel.findById(postID);

    if (auth) {
      post?.likes?.push(new mongoose.Types.ObjectId(auth._id));
      post.save();

      return res.status(201).json({
        message: "like a post",
        length: post.likes.length,
        data: post,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    const { authID, postID } = req.params;

    const auth = await authModel.findById(authID);
    const post: any = await postModel.findById(postID);

    if (auth) {
      post?.likes?.push(new mongoose.Types.ObjectId(auth._id));
      post.save();

      return res.status(201).json({
        message: "unlike post",
        data: post,
        length: post.likes.length,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
