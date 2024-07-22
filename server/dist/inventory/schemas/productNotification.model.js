"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotification = void 0;
const mongoose_1 = require("mongoose");
const productNotificationSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order', required: true },
}, { timestamps: true });
exports.ProductNotification = (0, mongoose_1.model)('ProductNotification', productNotificationSchema);
//# sourceMappingURL=productNotification.model.js.map