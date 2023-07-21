"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    views: {
        type: (Array),
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    comments: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "comments",
        },
    ],
    likes: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "auths",
        },
    ],
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "auths",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("posts", postSchema);
