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
exports.unlikePost = exports.likePost = exports.readUserPost = exports.readPostCategory = exports.createPost = void 0;
const cloudinary_1 = __importDefault(require("../Config/cloudinary"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const postModel_1 = __importDefault(require("../Model/postModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { authID } = req.params;
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const { title, content, category } = req.body;
        const authUser = yield authModel_1.default.findById(authID);
        const post = yield postModel_1.default.create({
            title,
            content,
            category,
            image: secure_url,
            imageID: public_id,
            user: authUser,
        });
        (_b = authUser === null || authUser === void 0 ? void 0 : authUser.post) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(post._id));
        authUser.save();
        return res.status(201).json({
            message: "Success: createPost",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.createPost = createPost;
const readPostCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const makeSearch = req.query.search
            ? {
                $or: [{ category: { $regex: req.query.search, $options: "i" } }],
            }
            : {};
        const post = yield postModel_1.default.find(makeSearch);
        return res.status(200).json({
            message: `See post related to ${makeSearch}`,
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.readPostCategory = readPostCategory;
const readUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        const post = yield postModel_1.default.findById(authID).populate({
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
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.readUserPost = readUserPost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { authID, postID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const post = yield postModel_1.default.findById(postID);
        if (auth) {
            (_c = post === null || post === void 0 ? void 0 : post.likes) === null || _c === void 0 ? void 0 : _c.push(new mongoose_1.default.Types.ObjectId(auth._id));
            post.save();
            return res.status(201).json({
                message: "like a post",
                length: post.likes.length,
                data: post,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { authID, postID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const post = yield postModel_1.default.findById(postID);
        if (auth) {
            (_d = post === null || post === void 0 ? void 0 : post.likes) === null || _d === void 0 ? void 0 : _d.push(new mongoose_1.default.Types.ObjectId(auth._id));
            post.save();
            return res.status(201).json({
                message: "unlike post",
                data: post,
                length: post.likes.length,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.unlikePost = unlikePost;
