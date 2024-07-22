"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
const productNotification_model_1 = require("../../schemas/productNotification.model");
const products_model_1 = require("../../schemas/products.model");
let SellerService = class SellerService {
    async getSellerSales(req) {
        const user = req.user;
        const sellerSales = await products_model_1.Product.aggregate([
            {
                $match: {
                    creator: new mongoose.Types.ObjectId(user.id),
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    foreignField: 'productId',
                    localField: '_id',
                    as: 'productSales',
                    pipeline: [
                        {
                            $match: {
                                status: 'delivered',
                            },
                        },
                        {
                            $group: {
                                _id: '$productId',
                                totalSaledStock: { $sum: '$productQuantity' },
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$productSales',
            },
            {
                $project: {
                    productSales: 1,
                    name: 1,
                    price: 1,
                    totalSale: {
                        $multiply: ['$productSales.totalSaledStock', '$price'],
                    },
                },
            },
        ]);
        return sellerSales;
    }
    async getSellerProducts(req) {
        const user = req.user;
        const sellerProducts = await products_model_1.Product.aggregate([
            {
                $match: {
                    creator: new mongoose.Types.ObjectId(user.id),
                },
            },
        ]);
        return sellerProducts;
    }
    async getSellerPendingOrders(req) {
        const user = req.user;
        let sellerPendingOrders = await products_model_1.Product.aggregate([
            {
                $match: {
                    creator: new mongoose.Types.ObjectId(user.id),
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    foreignField: 'productId',
                    localField: '_id',
                    as: 'pendingOrders',
                    pipeline: [
                        {
                            $match: {
                                status: 'pending',
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    pendingOrders: 1,
                    name: 1,
                },
            },
        ]);
        return sellerPendingOrders;
    }
    async getSellerNotification(req) {
        const user = req.user;
        const notifications = await productNotification_model_1.ProductNotification.aggregate([
            {
                $match: {
                    receiver: new mongoose.Types.ObjectId(user.id),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'sender',
                    pipeline: [
                        {
                            $project: {
                                name: 1,
                                role: 1,
                                _id: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    foreignField: '_id',
                    localField: 'orderId',
                    as: 'order',
                    pipeline: [
                        {
                            $project: {
                                status: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$sender',
            },
            {
                $unwind: '$order',
            },
        ]);
        return notifications;
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)()
], SellerService);
//# sourceMappingURL=seller.service.js.map