import { Router } from "express";
import {
  createUser,
  deleteOneUser,
  signinUser,
  updateOneUser,
  viewOneUser,
  viewUser,
} from "../Controller/authController";
import { Upload } from "../Config/multer";

const auth: Router = Router();

auth.route("/new-user").post(Upload, createUser);
auth.route("/get-all").get(viewUser);
auth.route("/sign-in").post(signinUser);
auth.route("/:userID/get-one").get(viewOneUser);
auth.route("/:userID/update-one").patch(updateOneUser);
auth.route("/:userID/delete-one").delete(deleteOneUser);

export default auth;
