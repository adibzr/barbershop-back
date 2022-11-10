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
const express_1 = require("express");
const cloudinary_1 = require("../../libs/cloudinary");
const auth_1 = require("../../middlewares/auth");
const categories_1 = __importDefault(require("../../models/categories"));
const products_1 = __importDefault(require("../../models/products"));
const router = (0, express_1.Router)();
router.post("/create", auth_1.verifyToken, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description, price, stock, available, favorite, categories } = req.body;
    try {
        if (typeof name === "string")
            name = name.toLocaleLowerCase();
        const image = yield (0, cloudinary_1.uploadImage)(req.files.image.tempFilePath);
        console.log(image);
        const product = new products_1.default({
            name: name,
            description: description,
            price: price,
            stock: stock,
            image: image["secure_url"],
            available: available,
            favorite: favorite,
            categories: categories,
        });
        if (categories) {
            const foundCategory = yield categories_1.default.find({
                name: { $in: categories },
            });
            product.categories = foundCategory.map((el) => el._id);
        }
        product.populate("categories", "name -_id");
        const savedProduct = yield product.save();
        res.status(200).json(image);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
