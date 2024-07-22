"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const custom_exception_1 = require("../../../custom.exception");
const fs = require("fs");
const util_1 = require("util");
const cloudinary_build_url_1 = require("cloudinary-build-url");
const products_model_1 = require("../../schemas/products.model");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
let ProductService = class ProductService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadProductImage(file) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(file, {}, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
        });
    }
    async deletFileLocally(filePath) {
        try {
            const unlinkAsync = (0, util_1.promisify)(fs.unlink);
            await unlinkAsync(filePath);
        }
        catch (err) {
            console.log(err);
            throw new custom_exception_1.CustomException('Something went wrong while deleting file locally', 404);
        }
    }
    async deletFileFromCloudinary(image) {
        try {
            const publicId = (0, cloudinary_build_url_1.extractPublicId)(image);
            await cloudinary_1.v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error('Error deleting image:', error);
                    throw new custom_exception_1.CustomException('Error deleting image', 404);
                }
                console.log('Image deleted:', result);
            });
        }
        catch (err) {
            console.log(err);
            throw new custom_exception_1.CustomException('Something went wrong while deleting file from cloud', 404);
        }
    }
    async createProduct(product, req) {
        const user = req.user;
        const createdProduct = await products_model_1.Product.create({
            ...product,
            used: String(product.used) === 'true' ? true : false,
            creator: user.id,
        });
        return { message: 'Product created successfully' };
    }
    async deleteProduct(id, req) {
        const user = req.user;
        const product = await products_model_1.Product.findOneAndDelete({
            _id: id,
            creator: user.id,
        });
        if (!product) {
            throw new custom_exception_1.CustomException('Product not found', 404);
        }
        await this.deletFileFromCloudinary(product.image);
        return { message: 'Product Deleted successfully' };
    }
    async editProduct(editedProduct, req) {
        const user = req.user;
        const product = await products_model_1.Product.findOne({
            _id: editedProduct.productId,
            creator: user.id,
        });
        if (!product) {
            throw new custom_exception_1.CustomException('Product not found', 404);
        }
        console.log(product.extraImages);
        await products_model_1.Product.findByIdAndUpdate(product._id, {
            ...editedProduct,
            used: String(product.used) === 'true' ? true : false,
            extraImages: product.extraImages,
        });
        return { message: 'Product Updated successfully' };
    }
    async getProducts(req) {
        const { accessToken } = req.cookies;
        let user;
        if (accessToken) {
            user = this.jwtService.verify(accessToken, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
        }
        let query = {
            creator: { $ne: null },
        };
        if (user) {
            query = {
                creator: { $ne: new mongoose_1.default.Types.ObjectId(user.id) },
            };
        }
        const products = await products_model_1.Product.aggregate([
            {
                $match: query,
            },
        ]);
        return products;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], ProductService);
//# sourceMappingURL=product.service.js.map