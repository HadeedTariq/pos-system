"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const custom_exception_1 = require("../../../custom.exception");
const order_model_1 = require("../../schemas/order.model");
const productNotification_model_1 = require("../../schemas/productNotification.model");
const products_model_1 = require("../../schemas/products.model");
let OrderService = class OrderService {
    async orderProduct(order, req) {
        const user = req.user;
        const product = await products_model_1.Product.findOne({
            _id: order.productId,
            stock: { $gte: order.productQuantity },
            creator: { $ne: user.id },
        });
        if (!product) {
            throw new custom_exception_1.CustomException('Product not found or Your provided quantity is not available', 404);
        }
        const totalPrice = order.productQuantity * product.price;
        const newOrder = await order_model_1.Order.create({
            productId: product._id,
            requester_id: user.id,
            productQuantity: order.productQuantity,
            totalPrice,
        });
        await productNotification_model_1.ProductNotification.create({
            sender: user.id,
            receiver: product.creator,
            message: `${user.name} request for ${order.productQuantity} ${product.name}`,
            productId: product._id,
            orderId: newOrder._id,
        });
        const remainingStock = product.stock - order.productQuantity;
        await products_model_1.Product.findByIdAndUpdate(product._id, {
            stock: remainingStock,
        });
        return { message: 'Order Successfully.Your order is pending' };
    }
    async deleiverProduct(req, orderId) {
        const user = req.user;
        const updateOrder = await order_model_1.Order.findByIdAndUpdate(orderId, {
            status: 'reached',
        });
        if (!updateOrder) {
            throw new custom_exception_1.CustomException('Order not found', 404);
        }
        await productNotification_model_1.ProductNotification.create({
            sender: user.id,
            receiver: updateOrder.requester_id,
            message: `Your order reached`,
            productId: updateOrder.productId,
            orderId: updateOrder._id,
        });
        return { message: 'Order deleivered successfully' };
    }
    async cancelOrderBySeller(req, orderId) {
        const user = req.user;
        const updateOrder = await order_model_1.Order.findByIdAndUpdate(orderId, {
            status: 'cancel',
        });
        if (!updateOrder) {
            throw new custom_exception_1.CustomException('Order not found', 404);
        }
        if (updateOrder.status === 'cancel') {
            throw new custom_exception_1.CustomException('Order already canceled', 200);
        }
        await products_model_1.Product.findByIdAndUpdate(updateOrder.productId, {
            $inc: { stock: updateOrder.productQuantity },
        });
        await productNotification_model_1.ProductNotification.create({
            sender: user.id,
            receiver: updateOrder.requester_id,
            message: `Your order canceled`,
            productId: updateOrder.productId,
            orderId: updateOrder._id,
        });
        return { message: 'Order canceled successfully' };
    }
    async cancelOrderByUser(req, orderId) {
        const user = req.user;
        const { status } = await order_model_1.Order.findOne({
            _id: orderId,
        });
        if (status && status === 'delivered') {
            return { message: "Your order is deleiverd You cann't Cancel it" };
        }
        const updateOrder = await order_model_1.Order.findByIdAndUpdate(orderId, {
            status: 'cancel',
        });
        if (!updateOrder) {
            throw new custom_exception_1.CustomException('Order not found', 404);
        }
        if (updateOrder.status === 'cancel') {
            throw new custom_exception_1.CustomException('Order already canceled', 200);
        }
        const product = await products_model_1.Product.findByIdAndUpdate(updateOrder.productId, {
            $inc: { stock: updateOrder.productQuantity },
        });
        await productNotification_model_1.ProductNotification.create({
            sender: user.id,
            receiver: product.creator,
            message: `User cancel the order of ${product.name}`,
            productId: updateOrder.productId,
            orderId: updateOrder._id,
        });
        return { message: 'Order canceled successfully' };
    }
    async getMyOrders(req) {
        const user = req.user;
        const myOrders = await order_model_1.Order.aggregate([
            {
                $match: {
                    requester_id: new mongoose_1.default.Types.ObjectId(user.id),
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product',
                    pipeline: [
                        {
                            $project: {
                                name: 1,
                                image: 1,
                                price: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$product',
            },
        ]);
        return myOrders;
    }
    async handleEvent(event) {
        console.log('event called');
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(paymentIntent, 'paymentIntent');
                break;
            case 'identity.verification_session.created':
                const verificationCreated = event.data.object;
                console.log(verificationCreated, 'verificationCreated');
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return { message: 'Request accepted' };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
//# sourceMappingURL=order.service.js.map