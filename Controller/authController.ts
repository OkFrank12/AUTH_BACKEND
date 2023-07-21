import { Request, Response } from "express";
import authModel from "../Model/authModel";
import bcrypt from "bcrypt";
import cloudinary from "../Config/cloudinary";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const auth = await authModel.create({
      userName,
      email,
      password: hash,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(201).json({
      message: "User created",
      data: auth,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error on: createUser",
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const signIn = await authModel.findOne({ email });
    if (signIn) {
      const hash = await bcrypt.compare(password, signIn.password!);
      if (hash) {
        return res.status(201).json({
          message: `Welcome Back ${signIn.userName}`,
          data: signIn._id,
        });
      } else {
        return res.status(404).json({
          message: "Password is not correct",
        });
      }
    } else {
      return res.status(404).json({
        message: "User is not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error on: signinUser",
    });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const findAll = await authModel.find();

    return res.status(200).json({
      message: "Viewed user",
      data: findAll,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error on: viewUser",
    });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const checkOne = await authModel.findById(userID);

    return res.status(200).json({
      message: "Checking for a user",
      data: checkOne,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error on: viewOneUser",
    });
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { userName } = req.body;
    const updateOne = await authModel.findByIdAndUpdate(
      userID,
      { userName },
      { new: true }
    );

    return res.status(201).json({
      message: "Updated user info",
      data: updateOne,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error on: updateOneUser",
    });
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const deleteUser = await authModel.findByIdAndDelete(userID);

    return res.status(201).json({
      message: "Deleted a user",
      data: deleteUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error on: deleteOneUser",
    });
  }
};
