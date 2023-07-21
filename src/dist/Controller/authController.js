"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneUser = exports.updateOneUser = exports.viewOneUser = exports.viewUser = exports.signinUser = exports.createUser = void 0;
const authModel_1 = __importDefault(require("../Model/authModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../Config/cloudinary"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userName, password, email } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { public_id, secure_url } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const auth = yield authModel_1.default.create({
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
    }
    catch (error) {
        return res.status(404).json({
            message: "Error on: createUser",
        });
    }
});
exports.createUser = createUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const signIn = yield authModel_1.default.findOne({ email });
        if (signIn) {
            const hash = yield bcrypt_1.default.compare(password, signIn.password);
            if (hash) {
                return res.status(201).json({
                    message: `Welcome Back ${signIn.userName}`,
                    data: signIn._id,
                });
            }
            else {
                return res.status(404).json({
                    message: "Password is not correct",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User is not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error on: signinUser",
        });
    }
});
exports.signinUser = signinUser;
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAll = yield authModel_1.default.find();
        return res.status(200).json({
            message: "Viewed user",
            data: findAll,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error on: viewUser",
        });
    }
});
exports.viewUser = viewUser;
const viewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const checkOne = yield authModel_1.default.findById(userID);
        return res.status(200).json({
            message: "Checking for a user",
            data: checkOne,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error on: viewOneUser",
        });
    }
});
exports.viewOneUser = viewOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { userName } = req.body;
        const updateOne = yield authModel_1.default.findByIdAndUpdate(userID, { userName }, { new: true });
        return res.status(201).json({
            message: "Updated user info",
            data: updateOne,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error on: updateOneUser",
        });
    }
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const deleteUser = yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "Deleted a user",
            data: deleteUser,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error on: deleteOneUser",
        });
    }
});
exports.deleteOneUser = deleteOneUser;
